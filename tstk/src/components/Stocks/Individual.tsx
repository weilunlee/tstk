import { useEffect } from "react"
import { LayoutProps } from "../../interfaces/IfProps"
import { useAppDispatch, useAppSelector } from "../../stores/hooks"
import { STOCK_RESET } from "../../stores/stocksSlice"
import { UDIndex } from "../Dashboard/IndexRow"
import { Stock_all_day } from "../Dashboard/InterFaceDash"
import { REPORT_CHOSEN } from "../../stores/reportsSlice"
import IndividualSheet from "./IndividualSheet"

interface IndividualIF extends LayoutProps{ stock:Stock_all_day }

function Individual({stock, setNavSelc, lastSelc}:IndividualIF):JSX.Element{
    let _previousPage:number = lastSelc[0]
    const blcSheet = useAppSelector(state=>state.reports.reportSelc.balanceSheet)
    const dispatch = useAppDispatch()
    useEffect(()=>{dispatch(REPORT_CHOSEN(stock.Code))}, [dispatch, stock])
    function returnFunc(){
        setNavSelc(_previousPage)
        dispatch(STOCK_RESET())
    }
    let Qutoe = parseFloat(stock.ClosingPrice) - parseFloat(stock.OpeningPrice)
    let sign = Qutoe>0?"+":Qutoe===0?"":"-"
    let percentage = (Qutoe*100/parseFloat(stock.ClosingPrice)).toFixed(2)
    return <div className="MainContainer w-full overflow-auto scrollbar">
        <div className="cursor-pointer font-light text-white tracking-widest w-20" 
            onClick={returnFunc}> {"<"} {lastSelc[1]}</div>
        <div className="text-white w-2/3 flex flex-row justify-between text-3xl tracking-widest text-xlato font-extrabold">
            <div className="flex flex-row">
                <div>{stock.Name}</div>
                <div className="ml-4 font-normal text-lg">{stock.Code}</div>
                <div className="text-black">{UDIndex(sign, percentage.toString())}</div>
            </div>
            <div className="flex justify-end items-start px-6 bg-white text-black rounded-full">
                <div className="font-normal mr-3 text-base">收盤價</div>
                <div>{stock.ClosingPrice}</div>
            </div>
        </div>
        <div className="w-96 bg-white rounded-xl p-2" style={{}}>
            <div className={"grid grid-cols-16"}>
                <div className="flex justify-end items-center col-span-3 pr-2">{stock.ClosingPrice}</div>
                <div className="flex justify-end items-center col-span-3">{stock.TradeVolume} 張</div>
                <div className="flex justify-end items-center col-span-3 pr-5">{stock.Transaction} 次</div>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-10">
            <div className="text-white font-bold text-2xl col-span-2 flex">
                <div>財報</div>
                <div className="ml-5 font-normal text-base">{blcSheet?.年度}年 第{blcSheet?.季別}季</div>
            </div>
            <IndividualSheet {...stock} />
        </div>
    </div>
}

export default Individual