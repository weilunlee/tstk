import { useEffect, useState } from "react";
import { MAIN_INDEX, MI20_If, Stock_all_day } from "./InterFaceDash";
import ApiSets from "../../actions/APIs/apiSets";
import { UDIndex, UDsign, UDtransfer } from "./IndexRow";
import GLOBAL_FUNC from "../../actions/globalFunc";
import { useAppSelector } from "../../stores/hooks";

const IndiviualStock: React.FC=()=>{
    const store_stocks:Stock_all_day[] = useAppSelector(state=>state.stocks.stocks)
    const store_ETFs:Stock_all_day[] = useAppSelector(state=>state.stocks.etfs)
    // const [MI20, setMI20] = useState<MI20_If[]>([]);
    // useEffect(()=>{
    //     ApiSets.get_MI20<MI20_If[]>()
    //     .then(res=>{console.log(res); setMI20(res)})
    //     .catch(err=>{console.log(err)})
    // }, [])

    let Title:Array<string> = [
        "公司代號",
        "公司名稱",
        "開盤價",
        "最高點",
        "最低點",
        "收盤價",
        "漲跌幅",
        "張數",
        "總量",
        "交易次數",
    ]

    return(
    <div className="MainContainer">
        <div className="bg-white rounded-lg shadow">
            <div className="flex flex-row">
                <div className="text-2xl font-extrabold pl-4 tracking-wider">S T O C K </div>
                <div>{store_stocks.length}</div>
            </div>
            <div className="flex flex-row">
                {Title.map((res, index)=><div className={`${index===0?"pl-5":''} h-100 ${index===1?"w-44":"w-28"}`}key={index}>{res}</div>)}
            </div>
            <div className="h-72 scrollbar overflow-auto pad-l-2px">
                {store_stocks.map((res, index)=><StockRow {...res} key={index}/>)}
            </div>
        </div>
        <div className="bg-white rounded-lg shadow">
            <div className="text-2xl font-bold">ETF</div>
            <div className="flex flex-row">
                {Title.map((res, index)=><div className={`${index===0?"pl-5":''} h-100 ${index===1?"w-44":"w-28"}`}key={index}>{res}</div>)}
            </div>
            <div className="h-40 scrollbar overflow-auto pad-l-2px">
                {store_ETFs.map((res, index)=><div className="flex flex-row w-100 hover:bg-pink-200" key={index}>
                    <div className="pl-5 w-28">{res.Code}</div>
                    <div className="w-44">{res.Name}</div>
                    <div className="w-28">{res.OpeningPrice}</div>
                    <div className="w-28">{res.HighestPrice}</div>
                    <div className="w-28">{res.LowestPrice}</div>
                    <div className="w-28">{res.ClosingPrice}</div>
                    <div className="w-28">{res.Change}</div>
                    <div className="w-28">{res.TradeVolume}</div>
                    <div className="w-28">{res.TradeValue}</div>
                    <div className="w-28">{res.Transaction}</div>
                </div>)}
                </div>
        </div>
    </div>
    )
}
export default IndiviualStock

function StockRow(stock:Stock_all_day):JSX.Element{
    let Qutoe = parseFloat(stock.ClosingPrice) - parseFloat(stock.OpeningPrice)
    let sign = Qutoe>0?"+":Qutoe===0?"":"-"
    let percentage = (Qutoe*100/parseFloat(stock.ClosingPrice)).toFixed(2)
    return  <div className={" mb-1 flex flex-row hover:bg-pink-200"} >
    <div className={UDsign(sign, percentage.toString()) + " pl-3 flex items-center"}>{UDtransfer(sign, percentage.toString())}</div>
    <div className="w-32 flex flex-row">
        <div className="text-xs mr-4">{stock.Code}</div>
        <div className="flex items-center">{GLOBAL_FUNC.abbreviate(nameHandle(stock.Name), 5)}</div>
    </div>
    <div>{UDIndex(sign, percentage.toString())}</div>
    <div className="w-32 flex justify-center items-center">{stock.OpeningPrice}</div>
    <div className="w-32 flex justify-center items-center">{stock.ClosingPrice}</div>
    <div className="w-32 flex justify-center items-center">{stock.TradeVolume}</div>      
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