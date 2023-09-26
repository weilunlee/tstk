import { useEffect, useState } from "react";
import APIs from "../../actions/APIs"
import GLOBAL_VAR from "../../assests/globalAttr/globalVar"
import { Stock_all_day } from "../../interfaces/IfAPI";

const IndiviualStock: React.FC=()=>{
    const [allStock, setAllStock] = useState<Stock_all_day[]>([]);
    const [ETF, setETF] = useState<Stock_all_day[]>([]);

    useEffect(()=>{
        let getStocks:Promise<Stock_all_day[]> = new APIs(GLOBAL_VAR.HOST + "STOCK_DAY_ALL").GET()
        getStocks.then(res=>{
            let _etf = res.filter(_s=>_s.Code[0]==="0")
            let _stock = res.filter(_s=>_s.Code[0]!=="0")
            setETF(_etf)
            setAllStock(_stock)}
        )
        .catch(err=>{console.log(err)})
    }, [])

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
        {/* <div className="text-3xl tracking-wider font-extrabold">Hello User !</div> */}
        {/* {allStock} */}
        <div className="bg-white rounded-lg shadow">
            <div>{allStock.length}</div>
            <div className="text-2xl font-bold">STOCK</div>
            <div className="flex flex-row">
                {Title.map((res, index)=><div className={`${index===0?"pl-5":''} h-100 ${index===1?"w-44":"w-28"}`}key={index}>{res}</div>)}
            </div>
            <div className="h-60 scrollbar overflow-auto pad-l-2px">
                {allStock.map((res, index)=><div className="flex flex-row w-100 hover:bg-pink-200" key={index}>
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
        <div>{ETF.length}</div>
        <div className="bg-white rounded-lg shadow">
            <div className="text-2xl font-bold">ETF</div>
            <div className="flex flex-row">
                {Title.map((res, index)=><div className={`${index===0?"pl-5":''} h-100 ${index===1?"w-44":"w-28"}`}key={index}>{res}</div>)}
            </div>
            <div className="h-40 scrollbar overflow-auto pad-l-2px">
                {ETF.map((res, index)=><div className="flex flex-row w-100 hover:bg-pink-200" key={index}>
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