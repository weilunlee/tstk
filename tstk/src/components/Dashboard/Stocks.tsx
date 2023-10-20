import { UDIndex, UDsign, UDtransfer } from "./IndexRow";
import GLOBAL_FUNC from "../../actions/globalFunc";
import { useAppSelector } from "../../stores/hooks";
import { useEffect, useState } from "react";
import { Stock_all_day } from "./InterFaceDash";
import SortList from "../GlobalElements/SortLists";
import { useDispatch } from "react-redux";
import { STOCK_CHOSEN } from "../../stores/stocksSlice";

const StockRows: React.FC=()=>{
    const store_stocks:Stock_all_day[] = useAppSelector(state=>state.stocks.stocks)
    const store_ETFs:Stock_all_day[] = useAppSelector(state=>state.stocks.etfs)
    return(
    <div className="MainContainer grid grid-cols-2 gap-2">
        <StockFrame stocks={store_stocks} name="S T O C K"/>
        <StockFrame stocks={store_ETFs} name="E T F "/>
    </div>
    )
}
export default StockRows

interface StockFrameIF{
    stocks:Stock_all_day[],
    name:string
}

const StockFrame=({stocks, name}:StockFrameIF):JSX.Element=>{
    const contentArr:string[] = ["Change","TradeVolume","Transaction"]
    const [restoreType, setRestoreType] = useState<string>("Code");
    const [stockRow, setStockRow] = useState<Stock_all_day[]>();
    const [switcher, setSwitcher] = useState<number>(0);
    function handleSwitcher(_tag:number):void{
        if(_tag===switcher) setSwitcher(0)
        else setSwitcher(_tag)
    }
    function restoreHandle(_content:string){
        if(_content===restoreType) setRestoreType("Code")
        else setRestoreType(_content)
    }
    
    useEffect(()=>{
        if(!stocks) return
        if(restoreType==="Code") setStockRow(stocks)
        else if(switcher === 1){
            let _partial = stocks.slice().sort((a, b) => parseFloat(b[restoreType as keyof Stock_all_day]) - parseFloat(a[restoreType as keyof Stock_all_day])).slice(0, 50)
            setStockRow(_partial)
        }else{
            let _partial = stocks.slice().sort((a, b) => parseFloat(a[restoreType as keyof Stock_all_day]) - parseFloat(b[restoreType as keyof Stock_all_day])).slice(0, 50)
            setStockRow(_partial)
        }
    }, [restoreType, stocks, switcher])

    return(
    <div className="bg-white rounded-lg shadow col-span-1">
        <div className="flex flex-row items-center justify-between h-12">
            <div className="flex flex-row">
                <div className="text-2xl font-extrabold pl-4 tracking-wider mr-2">{name}</div>
                <div>{stocks.length}</div>
            </div>
            <SortList contentArr={contentArr} handleSwitcher={handleSwitcher} switcher={switcher} restoreType={restoreType} restoreHandle={restoreHandle}/>                  
        </div>
        <div className="h-[89vh] scrollbar overflow-auto pad-l-2px">
            {stockRow && stockRow.map((res, index)=><StockRow {...res} key={index}/>)}
        </div>
    </div>
    )
}

function StockRow(stock:Stock_all_day):JSX.Element{
    let Qutoe = parseFloat(stock.ClosingPrice) - parseFloat(stock.OpeningPrice)
    let sign = Qutoe>0?"+":Qutoe===0?"":"-"
    let percentage = (Qutoe*100/parseFloat(stock.ClosingPrice)).toFixed(2)
    const dispatch = useDispatch()

    return  <div className={"grid grid-cols-16 mb-1 hover:bg-pink-200"} onClick={()=>{dispatch(STOCK_CHOSEN(stock.Code))}}>
    <div className={UDsign(sign, percentage.toString()) + " pl-3 flex items-center col-span-1"}>{UDtransfer(sign, percentage.toString())}</div>
    <div className="flex flex-row col-span-4">
        <div className="w-8 text-xs mr-4">{stock.Code}</div>
        <div className="flex items-center">{GLOBAL_FUNC.abbreviate(nameHandle(stock.Name), 6)}</div>
    </div>
    <div className="col-span-2">{UDIndex(sign, percentage.toString())}</div>
    <div className="flex justify-end items-center col-span-3 pr-2">{stock.ClosingPrice}</div>
    <div className="flex justify-end items-center col-span-3">{stock.TradeVolume} 張</div>
    <div className="flex justify-end items-center col-span-3 pr-5">{stock.Transaction} 次</div>
</div>
}

export function nameHandle(name:string):string{
    let _spliter = "股份有限公司"
    let _spliter2 = "(股)公司"
    let _spliter3 = "控股有限公司"
    let _spliter4 = "有限公司"
    if (name.includes(_spliter)) return name.split(_spliter)[0]
    else if (name.includes(_spliter2)) return name.split(_spliter2)[0]
    else if (name.includes(_spliter3)) return name.split(_spliter4)[0]
    else if (name.includes(_spliter4)) return name.split(_spliter4)[0] 
    else return name
}