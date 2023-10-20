import { useEffect, useState } from "react"
import { LayoutProps } from "../../interfaces/IfProps"
import { incStatementIF } from "../../actions/APIs/apiInterface"
import GLOBAL_FUNC from "../../actions/globalFunc"
import { useAppSelector } from "../../stores/hooks"
import { Stock_all_day } from "../Dashboard/InterFaceDash"
import SortList from "../GlobalElements/SortLists"

interface incStatement_with_stockInfo extends incStatementIF{
    ClosingPrice:string,
    PEratio:string
}

const IncomeStatement = ({setNavSelc, lastSelc}:LayoutProps):JSX.Element=>{
    const [incSTMRow, setIncSTMRow] = useState<incStatement_with_stockInfo[]>();
    const [restoreType, setRestoreType] = useState<string>("資產總額");
    const store_stocks:Stock_all_day[] = useAppSelector(state=>state.stocks.stocks)    
    const store_normal:incStatementIF[] = useAppSelector(state=>state.reports.incomeSheet.normal)
    const store_incFinancial:incStatementIF[] = useAppSelector(state=>state.reports.incomeSheet.financial)
    const store_incSecur:incStatementIF[] = useAppSelector(state=>state.reports.incomeSheet.sercurities)
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
        let highest =[...store_normal, ...store_incSecur, ...store_incFinancial].flatMap(res=>{
            let _stock:Stock_all_day = store_stocks.filter(stock=>stock.Code===res.公司代號)[0]
            if(!_stock) return []
            let _arr:incStatement_with_stockInfo = {...res, ...{
                ClosingPrice:_stock.ClosingPrice,
                PEratio:GLOBAL_FUNC.fractial(_stock.ClosingPrice, res["基本每股盈餘（元）"], 1)
            }}
            return _arr
        })
        let _partial:incStatement_with_stockInfo[]
        if(switcher===2){
            _partial = highest.sort((a, b) => parseFloat(a[restoreType as keyof incStatement_with_stockInfo]) - parseFloat(b[restoreType as keyof incStatement_with_stockInfo])).slice(0, 50)
        }
        else{
            _partial = highest.sort((a, b) => parseFloat(b[restoreType as keyof incStatement_with_stockInfo]) - parseFloat(a[restoreType as keyof incStatement_with_stockInfo])).slice(0, 50)
        }
        if (!_partial) return
        setIncSTMRow(_partial)
    }, [store_normal, store_incFinancial, store_incSecur, restoreType, store_stocks, switcher])
    
    return <div className="MainContainer">
        <div className="bg-white rounded-xl shadow col-span-1">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center justify-between pr-5 w-full h-12">
                    <div className="flex flex-row">
                        <div className="text-2xl font-extrabold pl-4 tracking-wider mr-2">損 益 表 </div>
                        <div>{incSTMRow&& incSTMRow[0] && GLOBAL_FUNC.month(incSTMRow[0].季別)}出表</div>
                    </div>
                    <SortList 
                        restoreHandle={restoreHandle} 
                        restoreType={restoreType}
                        contentArr={["基本每股盈餘（元）", "PEratio", "營業收入", "本期淨利（淨損）"]}
                        switcher={switcher}
                        handleSwitcher={handleSwitcher}
                        />
           
                </div>
            </div>
            <div className="flex flex-row text-l font-bold text-white mr-[10px]">
                <div className="flex justify-center text-black w-40">C O M P A N Y</div>
                {["NET SALES", "Cost of S.", "Gross Pr.","S&O Exp.","Op. Income","Other Inc.","Inc. b. Tex","Inc. Tex Exp.","NET INC."].map((res, index)=><div
                    className={`w-28 flex justify-center border-r ${index%2===0?"bg-slate-600":"text-black"}`}>
                    {res}
                </div>)}
            </div>
            <div className="scrollbar overflow-auto" style={{height:" calc(100vh - 6rem)"}}>
                {incSTMRow?.map(res=>{
                    return <CompanyRow {...res} key={res.公司代號} />
                })}
            </div>
        </div>
    </div>
}

export default IncomeStatement

const CompanyRow=(props:incStatement_with_stockInfo):JSX.Element=>{
    const [openBox, setOpenBox] = useState(false);
    function toggoleBox():void{ setOpenBox(!openBox) }
    return <div className={`flex flex-row border-b cursor-default ${openBox?"h-24":""}`} onClick={toggoleBox}>
        <div className="w-40 flex flex-col border-r border-slate-200">
            <div className="flex flex-row">
                <div className="text-xs flex justify-center w-10">{props.公司代號}</div>
                <div className="flex w-24">{GLOBAL_FUNC.abbreviate(props.公司名稱, 3)}</div>
                <div className="w-20">{GLOBAL_FUNC.fractial(props["基本每股盈餘（元）"], props.ClosingPrice, 1)}</div>
            </div>
            {openBox?<div className="w-full flex flex-col items-end">
                <div className="w-20">
                    <div>{props["基本每股盈餘（元）"]}</div>
                    <div className="border-t border-black w-12"></div>
                    <div>{props.ClosingPrice}</div>
                </div>
            </div>:""}
        </div>
        <div className="w-28">
            <div>{GLOBAL_FUNC.abbreviateNumber(props.營業收入)}</div>{/* (仟元 * 1000) */}
        </div>
        <div className="flex flex-col justify-start items-center border-r border-slate-200 w-28">
            <div className="flex flex-row relative items-center">{GLOBAL_FUNC.abbreviateNumber(props.營業成本)}</div>
            {openBox?<div className="rounded-full bg-slate-200 px-2 text-sm">{GLOBAL_FUNC.fractial(props.營業成本, props.營業收入, 0)}</div>:null}
        </div>
        <div className="w-28 flex flex-col justify-between items-center">
            <div className="flex flex-row relative items-center">{GLOBAL_FUNC.abbreviateNumber(props["營業毛利（毛損）"])}</div>
            {openBox?<div className="rounded-full bg-slate-200 px-2 text-sm">{GLOBAL_FUNC.fractial(props.營業成本, props.營業收入, 0)}</div>:null}

            {openBox?<div className="">{GLOBAL_FUNC.abbreviateNumber(props["營業毛利（毛損）淨額"], "保留盈餘")}</div>:null}
        </div>
        <div className="w-28 flex flex-col justify-between items-center border-r border-slate-200">
            <div className="flex flex-row relative items-center">{GLOBAL_FUNC.abbreviateNumber(props.營業費用)}</div>
        </div>
        <div className="w-28 flex flex-col justify-between items-center">
            <div className="flex flex-row relative items-center">{GLOBAL_FUNC.abbreviateNumber(props["營業利益（損失）"])}</div>
        </div>
        <div className="w-28 flex flex-col justify-between items-center border-r border-slate-200">
            <div className="flex flex-row relative items-center">{GLOBAL_FUNC.abbreviateNumber(props.營業外收入及支出)}</div>
        </div>
        {/* <div className="w-28 flex flex-col justify-between items-center border-r border-slate-200">
            <div className="flex flex-row relative items-center">{GLOBAL_FUNC.abbreviateNumber(props["其他綜合損益（淨額）"])}</div>
        </div> */}
        <div className="w-28 flex flex-col justify-between items-center border-r border-slate-200">
            <div className="flex flex-row relative items-center">{GLOBAL_FUNC.abbreviateNumber(props["稅前淨利（淨損）"])}</div>
        </div>
        <div className="w-28 flex flex-col justify-between items-center border-r border-slate-200">
            <div className="flex flex-row relative items-center">{GLOBAL_FUNC.abbreviateNumber(props["所得稅費用（利益）"])}</div>
        </div>
        <div className="w-28 flex flex-col justify-between items-center border-r border-slate-200">
            <div className="flex flex-row relative items-center">
                {GLOBAL_FUNC.abbreviateNumber(props["本期淨利（淨損）"])}
            </div>
        </div>
    </div>
}
// {openBox?<div className="flex flex-row justify-around w-full">
// <div className="bg-fuchsia-100 rounded-full px-3 flex flex-row justify-center items-center">
//     {GLOBAL_FUNC.abbreviateNumber(props.流動資產, "流動資產")}
//     <div className="rounded-full bg-white ml-1 px-2 text-sm">{fractial(props.流動資產, props.資產總額)}</div>
// </div>
// <div className="border-r border-black w-0 h-full"></div>
// <div className="bg-fuchsia-100 rounded-full px-3 flex flex-row justify-center items-center">
//     {GLOBAL_FUNC.abbreviateNumber(props.非流動資產, "非流動資產")}
//     <div className="rounded-full bg-white ml-1 px-2 text-sm">{fractial(props.非流動資產, props.資產總額)}</div>
// </div>
// </div>:null}