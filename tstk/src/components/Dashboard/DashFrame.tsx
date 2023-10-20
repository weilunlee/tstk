import { useEffect, useState } from "react";
import { MAIN_INDEX, Stock_all_day } from "./InterFaceDash";
import ApiSets from "../../actions/APIs/apiSets";
import Dashboard from "./Dashboard";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { SET_ETFS, SET_MIS, SET_STOCKS } from "../../stores/stocksSlice";
import IndexRow from "./IndexRow";
export interface AllStockIF{ allStock:MAIN_INDEX[], desc:MAIN_INDEX[], asc:MAIN_INDEX[] }

const DashFrame: React.FC=()=>{
    const [desc, setDesc] = useState<MAIN_INDEX[]>([]);
    const [asc, setAsc] = useState<MAIN_INDEX[]>([]);
    const dispatch = useAppDispatch()
    const store_MI = useAppSelector(state=>state.stocks.mainIndex)
    const store_stocks = useAppSelector(state=>state.stocks.stocks)

    useEffect(()=>{
        if(store_MI.length!==0){return}
        ApiSets.get_main_index<MAIN_INDEX[]>()
        .then(res=>{dispatch(SET_MIS(res))})
        .catch(err=>{console.log(err)})
    }, [dispatch, store_MI])

    useEffect(()=>{
        if(store_MI.length===0) return
        let highest = [...store_MI].sort((a, b) => parseFloat(b.漲跌百分比) - parseFloat(a.漲跌百分比))
        let lowest = [...store_MI].sort((a, b) => parseFloat(a.漲跌百分比) - parseFloat(b.漲跌百分比))
        setDesc(highest)
        setAsc(lowest)
    }, [store_MI])

    useEffect(()=>{
        if(store_stocks.length!==0){return}
        ApiSets.get_StockAllDay<Stock_all_day[]>()
        .then(res=>{
            let _etf = res.filter(_s=>_s.Code[0]==="0")
            let _stock = res.filter(_s=>_s.Code[0]!=="0")
            dispatch(SET_ETFS(_etf))
            dispatch(SET_STOCKS(_stock))
        })
        .catch(err=>{console.log(err)})
    }, [dispatch, store_stocks])

    return(
    <div className="MainContainer grid grid-cols-2 gap-5">
        <IndexRow allStock={store_MI} desc={desc} asc={asc}/>
        <Dashboard allStock={store_MI} desc={desc} asc={asc}/>
    </div>
    )
}
export default DashFrame