import { useEffect, useState } from "react";
import { MAIN_INDEX, Stock_all_day } from "./InterFaceDash";
import ApiSets from "../../actions/APIs/apiSets";
import IndexRow from "./IndexRow";
import Dashboard from "./Dashboard";
import { useAppDispatch } from "../../stores/hooks";
import { SET_ETFS, SET_STOCKS } from "../../stores/stocksSlice";
export interface AllStockIF{ allStock:MAIN_INDEX[], desc:MAIN_INDEX[], asc:MAIN_INDEX[] }

const DashFrame: React.FC=()=>{
    const [allStock, setAllStock] = useState<MAIN_INDEX[]>([]);
    const [desc, setDesc] = useState<MAIN_INDEX[]>([]);
    const [asc, setAsc] = useState<MAIN_INDEX[]>([]);
    const dispatch = useAppDispatch()

    useEffect(()=>{
        ApiSets.get_main_index<MAIN_INDEX[]>()
        .then(res=>{
            setAllStock(res)
            let highest = [...res].sort((a, b) => parseFloat(b.漲跌百分比) - parseFloat(a.漲跌百分比))
            let lowest = [...res].sort((a, b) => parseFloat(a.漲跌百分比) - parseFloat(b.漲跌百分比))
            setDesc(highest)
            setAsc(lowest)
        })
        .catch(err=>{console.log(err)})
    }, [])

    useEffect(()=>{
        ApiSets.get_StockAllDay<Stock_all_day[]>()
        .then(res=>{
            let _etf = res.filter(_s=>_s.Code[0]==="0")
            let _stock = res.filter(_s=>_s.Code[0]!=="0")
            dispatch(SET_ETFS(_etf))
            dispatch(SET_STOCKS(_stock))
        })
        .catch(err=>{console.log(err)})

        // ApiSets.get_MI20<MAIN_INDEX[]>()
        // .then(res=>{setMI20(res)})
        // .catch(err=>{console.log(err)})
    }, [dispatch])

    return(
    <div className="MainContainer grid grid-cols-2 gap-5">
        <IndexRow allStock={allStock} desc={desc} asc={asc}/>
        <Dashboard allStock={allStock} desc={desc} asc={asc}/>
    </div>
    )
}
export default DashFrame