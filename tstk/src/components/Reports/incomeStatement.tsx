import { useEffect, useState } from "react"
import ApiSets from "../../actions/APIs/apiSets"
import { LayoutProps } from "../../interfaces/IfProps"
import { incStatementIF } from "../../actions/APIs/apiInterface"
import GLOBAL_FUNC, { SelcBox } from "../../actions/globalFunc"
import { useAppDispatch, useAppSelector } from "../../stores/hooks"
import { SET_INC_FINANCIAL, SET_INC_NORMAL, SET_INC_SECURITIES } from "../../stores/reportsSlice"
import { Stock_all_day } from "../Dashboard/InterFaceDash"

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
    const dispatch = useAppDispatch()
    useEffect(()=>{
        if(store_normal.length!==0) return
        ApiSets.get_incomeStatement<incStatementIF[]>()
        .then(res=>{dispatch(SET_INC_NORMAL(res))})
        .catch(err=>{console.log(err)})
    }, [dispatch, store_normal])
    useEffect(()=>{
        if(store_incFinancial.length!==0) return
        ApiSets.get_incomeStatement_financial<incStatementIF[]>()
        .then(res=>{dispatch(SET_INC_FINANCIAL(res))})
        .catch(err=>{console.log(err)})
    }, [dispatch, store_incFinancial])
    useEffect(()=>{
        if(store_incSecur.length!==0) return
        ApiSets.get_incomeStatement_securities<incStatementIF[]>()
        .then(res=>{dispatch(SET_INC_SECURITIES(res))})
        .catch(err=>{console.log(err)})
    }, [dispatch, store_incSecur])
    
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
        if(restoreType==="PEratio"){
            _partial = highest.sort((a, b) => parseFloat(a[restoreType as keyof incStatementIF]) - parseFloat(b[restoreType as keyof incStatementIF]))
        }
        else{
            _partial = highest.sort((a, b) => parseFloat(b[restoreType as keyof incStatementIF]) - parseFloat(a[restoreType as keyof incStatementIF])).slice(0, 50)
        }
        if (!_partial) return
        setIncSTMRow(_partial)
    }, [store_normal, store_incFinancial, store_incSecur, restoreType, store_stocks])
    
    return <div className="MainContainer">
        <div className="bg-white rounded-xl shadow col-span-1">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center justify-between pr-5 w-full h-12">
                    <div className="flex flex-row">
                        <div className="text-2xl font-extrabold pl-4 tracking-wider mr-2">損 益 表 </div>
                        <div>{incSTMRow&& incSTMRow[0] && GLOBAL_FUNC.month(incSTMRow[0].季別)}出表</div>
                    </div>
                    <div className="flex flex-row">
                        {["基本每股盈餘（元）", "PEratio", "營業收入", "本期淨利（淨損）"].map(res=><SelcBox key={res} content={res} func={setRestoreType} selected={restoreType}/>)}
                    </div>                    
                </div>
            </div>
            <div className="grid grid-cols-12 text-l font-bold text-white mr-[10px]">
                <div className="col-span-2 flex justify-center text-black">C O M P A N Y</div>
                <div className="col-span-3 flex justify-center bg-pink-600">R E V E N U E</div>
                <div className="col-span-3 flex justify-center bg-emerald-600">C O S T</div>
                <div className="col-span-4 flex justify-center bg-slate-700">G R O S S</div>
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
    return <div className={`grid grid-cols-12 border-b cursor-default ${openBox?"h-24":""}`} onClick={toggoleBox}>
        <div className="col-span-2 flex flex-col border-r border-slate-200">
            <div className="flex flex-row">
                <div className="text-xs flex justify-center w-10">{props.公司代號}</div>
                <div className="flex w-24">{GLOBAL_FUNC.abbreviate(props.公司名稱, 5)}</div>
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
        <div className="col-span-3 flex flex-col justify-start items-center border-r border-slate-200">
            <div>{GLOBAL_FUNC.abbreviateNumber(props.營業收入)}</div>{/* (仟元 * 1000) */}
            {/* {openBox?<div className="flex flex-row justify-around w-full">
                <div className="bg-fuchsia-100 rounded-full px-3 flex flex-row justify-center items-center">
                    {GLOBAL_FUNC.abbreviateNumber(props.流動資產, "流動資產")}
                    <div className="rounded-full bg-white ml-1 px-2 text-sm">{fractial(props.流動資產, props.資產總額)}</div>
                </div>
                <div className="border-r border-black w-0 h-full"></div>
                <div className="bg-fuchsia-100 rounded-full px-3 flex flex-row justify-center items-center">
                    {GLOBAL_FUNC.abbreviateNumber(props.非流動資產, "非流動資產")}
                    <div className="rounded-full bg-white ml-1 px-2 text-sm">{fractial(props.非流動資產, props.資產總額)}</div>
                </div>
            </div>:null} */}
        </div>
        <div className="col-span-3 flex flex-col justify-start items-center border-r border-slate-200">
            <div className="flex flex-row relative items-center">
                {GLOBAL_FUNC.abbreviateNumber(props.營業成本)}
                <div className="absolute translate-x-16 rounded-full bg-slate-200 px-2 text-sm">{GLOBAL_FUNC.fractial(props["營業毛利（毛損）"], props.營業收入, 0)}</div>
            </div>
            {/* {openBox?<div className="flex flex-row justify-around w-full relative">
                <div className="bg-sky-100 rounded-full px-3 flex flex-row justify-center items-center">
                    {GLOBAL_FUNC.abbreviateNumber(props.流動負債, "流動負債")}
                    <div className="rounded-full bg-white px-2 ml-1 text-sm">{fractial(props.流動負債, props.負債總額)}</div>
                </div>
                <div className="border-r border-black w-0 h-full"></div>
                <div className="bg-sky-100 rounded-full px-3 flex flex-row justify-center items-center">
                    {GLOBAL_FUNC.abbreviateNumber(props.非流動負債, "非流動負債")}
                    <div className="rounded-full bg-white px-2 ml-1 text-sm">{fractial(props.非流動負債, props.負債總額)}</div>
                </div>
            </div>:null} */}
        </div>
        <div className="col-span-4 flex flex-col justify-between items-center px-7">
            <div className="flex flex-row relative items-center">
                {GLOBAL_FUNC.abbreviateNumber(props["本期淨利（淨損）"])}
                <div className="absolute translate-x-16 rounded-full bg-slate-200 px-2 text-sm">{GLOBAL_FUNC.fractial(props.營業成本, props.營業收入, 0)}</div>
            </div>
            {/* {openBox?<><div className="flex flex-row justify-around w-full relative border-b border-slate-800 pb-1">
                <div className="">一般權益</div>
                <div className="bg-slate-200 rounded-full px-3">{GLOBAL_FUNC.abbreviateNumber(props.保留盈餘, "保留盈餘")}</div>
                <div className="bg-slate-200 rounded-full px-3">{GLOBAL_FUNC.abbreviateNumber(props.股本, "股本")}</div>
                <div className="bg-slate-200 rounded-full px-3">{GLOBAL_FUNC.abbreviateNumber(props.資本公積, "資本公積")}</div>
            </div>
            <div className="flex flex-row justify-around w-full relative mb-2">
                <div>特殊權益</div>
                <div className="bg-slate-200 rounded-full px-3">{GLOBAL_FUNC.abbreviateNumber(props.其他權益, "其他權益")}</div>
                <div className="bg-slate-200 rounded-full px-3">{GLOBAL_FUNC.abbreviateNumber(props.非控制權益, "非控制權益")}</div>
                <div className="bg-slate-200 rounded-full px-3">{GLOBAL_FUNC.abbreviateNumber(props.庫藏股票, "庫藏股")}</div>
            </div>
            </>:null} */}
        </div>
    </div>
}