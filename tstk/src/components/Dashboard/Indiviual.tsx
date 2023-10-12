import { MAIN_INDEX, Stock_all_day } from "./InterFaceDash";
import { UDIndex, UDsign, UDtransfer } from "./IndexRow";
import GLOBAL_FUNC, { SelcBox } from "../../actions/globalFunc";
import { useAppSelector } from "../../stores/hooks";
import { useEffect, useState } from "react";

const IndiviualStock: React.FC=()=>{
    const store_stocks:Stock_all_day[] = useAppSelector(state=>state.stocks.stocks)
    const store_ETFs:Stock_all_day[] = useAppSelector(state=>state.stocks.etfs)
    return(
    <div className="MainContainer grid grid-cols-2 gap-2">
        <StockFrame stocks={store_stocks} name="S T O C K"/>
        <StockFrame stocks={store_ETFs} name="E T F "/>
    </div>
    )
}
export default IndiviualStock

interface StockFrameIF{
    stocks:Stock_all_day[],
    name:string
}

const StockFrame=({stocks, name}:StockFrameIF):JSX.Element=>{
    const [restoreType, setRestoreType] = useState<string>("Code");
    const [stockRow, setStockRow] = useState<Stock_all_day[]>();
    
    useEffect(()=>{
        if(!stocks) return
        let _partial = stocks.slice().sort((a, b) => parseFloat(b[restoreType as keyof Stock_all_day]) - parseFloat(a[restoreType as keyof Stock_all_day])).slice(0, 50)
        setStockRow(_partial)
    }, [restoreType, stocks])

    return(
    <div className="bg-white rounded-lg shadow col-span-1">
        <div className="flex flex-row items-center justify-between pr-5 h-12">
            <div className="flex flex-row">
                <div className="text-2xl font-extrabold pl-4 tracking-wider mr-2">{name}</div>
                <div>{stocks.length}</div>
            </div>
            <div className="flex flex-row">
                {["Code","Change","TradeVolume","Transaction"].map(res=><SelcBox key={res} content={res} func={setRestoreType} selected={restoreType}/>)}
            </div>                    
        </div>
        <div className="h-[85vh] scrollbar overflow-auto pad-l-2px">
            {stockRow && stockRow.map((res, index)=><StockRow {...res} key={index}/>)}
        </div>
    </div>
    )
}

function StockRow(stock:Stock_all_day):JSX.Element{
    let Qutoe = parseFloat(stock.ClosingPrice) - parseFloat(stock.OpeningPrice)
    let sign = Qutoe>0?"+":Qutoe===0?"":"-"
    let percentage = (Qutoe*100/parseFloat(stock.ClosingPrice)).toFixed(2)
    return  <div className={"grid grid-cols-16 mb-1 hover:bg-pink-200"} >
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

function Top20Trade(row:MAIN_INDEX[]):JSX.Element{
    return <div className={`mt-5 border-l-[30px] border-4 border-slate-300 bg-white shadow rounded-xl w-[25rem] h-80 flex flex-col justify-around items-start`}>
        {row.map(res=><div className="w-full flex flex-row justify-between items-center hover:bg-slate-200" key={res.指數}>
            {/* <div>{UDIndex(res.漲跌, res.漲跌百分比)}</div>
            <div className="w-40">{GLOBAL_FUNC.abbreviate(nameHandle(res.指數), 8)}</div>
            <div className="w-20">{res.收盤指數}</div> */}
        </div>)}
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