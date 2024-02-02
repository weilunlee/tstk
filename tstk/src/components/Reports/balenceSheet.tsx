import { useEffect, useState } from "react"
import { LayoutProps } from "../../interfaces/IfProps"
import { blcSheetIF } from "../../actions/APIs/apiInterface"
import GLOBAL_FUNC from "../../actions/globalFunc"
import { Stock_all_day } from "../Dashboard/InterFaceDash"
import { useAppSelector } from "../../stores/hooks"
import SortList from "../GlobalElements/SortLists"

interface blcsheet_with_stockInfo extends blcSheetIF{
    ClosingPrice:string,
    TradeValue:string,
    TradeVolume:string,
    Transaction:string,
    BookValueOverShareValue:string,
    PERatio:string
}

const BalenceSheet = ({setNavSelc, lastSelc}:LayoutProps):JSX.Element=>{
    const contentArr:string[] = ["資產總額", "負債總額", "權益總額", "保留盈餘", "流動資產", "BookValueOverShareValue", "PERatio"]
    const [blcSheetRow, setBlcSheetRow] = useState<blcsheet_with_stockInfo[]>();
    const [restoreType, setRestoreType] = useState<string>("資產總額");
    const store_stocks:Stock_all_day[] = useAppSelector(state=>state.stocks.stocks)
    const store_blcNormal:blcSheetIF[] = useAppSelector(state=>state.reports.balanceSheet.normal)
    const store_blcFinancial:blcSheetIF[] = useAppSelector(state=>state.reports.balanceSheet.financial)
    const store_blcSecur:blcSheetIF[] = useAppSelector(state=>state.reports.balanceSheet.sercurities)
    console.log(store_blcNormal)
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
        let highest = [...store_blcSecur, ...store_blcNormal, ...store_blcFinancial].flatMap(res=>{
            let _stock:Stock_all_day = store_stocks.filter(stock=>stock.Code===res.公司代號)[0]
            if(!_stock) return []
            let _arr:blcsheet_with_stockInfo = {...res, ...{
                ClosingPrice:_stock.ClosingPrice,
                TradeValue:_stock.TradeValue,
                TradeVolume:_stock.TradeVolume,
                Transaction:_stock.Transaction,
                BookValueOverShareValue:GLOBAL_FUNC.fractial(res.每股參考淨值, _stock.ClosingPrice, 1),
                PERatio:""
            }}
            return _arr
        })
        let _partial:blcsheet_with_stockInfo[]
        if(switcher===2){
            _partial = highest.sort((a, b) => parseFloat(a[restoreType as keyof blcsheet_with_stockInfo]) - parseFloat(b[restoreType as keyof blcsheet_with_stockInfo])).slice(0, 50)
        }
        else{
            _partial = highest.sort((a, b) => parseFloat(b[restoreType as keyof blcsheet_with_stockInfo]) - parseFloat(a[restoreType as keyof blcsheet_with_stockInfo])).slice(0, 50)
        }
        if (!_partial) return
        setBlcSheetRow(_partial)
    }, [store_blcSecur, store_blcNormal, store_blcFinancial, restoreType, store_stocks, switcher])

    return <div className="MainContainer">
        <div className="bg-white rounded-xl shadow col-span-1">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center justify-between pr-5 w-full h-12">
                    <div className="flex flex-row">
                        <div className="text-2xl font-extrabold pl-4 tracking-wider mr-2">資 產 負 債 表 </div>
                        <div>{blcSheetRow&& blcSheetRow[0] && GLOBAL_FUNC.month(blcSheetRow[0].季別)}出表</div>
                    </div>
                    <SortList contentArr={contentArr} restoreType={restoreType} restoreHandle={restoreHandle} handleSwitcher={handleSwitcher} switcher={switcher}/>
                </div>
            </div>
            <div className="grid grid-cols-12 text-l font-bold text-white mr-[10px]">
                <div className="col-span-2 flex justify-center text-black">C O M P A N Y</div>
                <div className="col-span-3 flex justify-center bg-pink-600">A S S E T S</div>
                <div className="col-span-3 flex justify-center bg-emerald-600">L I A B I L I T Y</div>
                <div className="col-span-4 flex justify-center bg-slate-700">E Q U I T Y</div>
            </div>
            <div className="scrollbar overflow-auto" style={{height:" calc(100vh - 6rem)"}}>
                {blcSheetRow?.map(res=>{
                    return <CompanyRow {...res} key={res.公司代號} />
                })}
            </div>
        </div>
    </div>
}

export default BalenceSheet

const CompanyRow=(props:blcsheet_with_stockInfo):JSX.Element=>{
    const [openBox, setOpenBox] = useState(false);
    function toggoleBox():void{ setOpenBox(!openBox) }
    return <div className={`grid grid-cols-12 border-b cursor-default ${openBox?"h-24":""}`} onClick={toggoleBox}>
        <div className="col-span-2 flex flex-col border-r border-slate-200">
            <div className="flex flex-row">
                <div className="text-xs flex justify-center w-10">{props.公司代號}</div>
                <div className="flex w-24">{GLOBAL_FUNC.abbreviate(props.公司名稱, 5)}</div>
                <div className="w-20">{props.BookValueOverShareValue}</div>
            </div>
            {openBox?<div className="w-full flex flex-col items-end">
                <div className="w-20">
                    <div>{props.每股參考淨值}</div>
                    <div className="border-t border-black w-12"></div>
                    <div>{props.ClosingPrice}</div>
                </div>
            </div>:""}
        </div>
        <div className="col-span-3 flex flex-col justify-start items-center border-r border-slate-200">
            <div>{GLOBAL_FUNC.abbreviateNumber(props.資產總額)}</div>{/* (仟元 * 1000) */}
            {openBox?<div className="flex flex-row justify-around w-full">
                <div className="bg-fuchsia-100 rounded-full px-3 flex flex-row justify-center items-center">
                    {GLOBAL_FUNC.abbreviateNumber(props.流動資產, "流動資產")}
                    <div className="rounded-full bg-white ml-1 px-2 text-sm">{GLOBAL_FUNC.fractial(props.流動資產, props.資產總額, 0)}</div>
                </div>
                <div className="border-r border-black w-0 h-full"></div>
                <div className="bg-fuchsia-100 rounded-full px-3 flex flex-row justify-center items-center">
                    {GLOBAL_FUNC.abbreviateNumber(props.非流動資產, "非流動資產")}
                    <div className="rounded-full bg-white ml-1 px-2 text-sm">{GLOBAL_FUNC.fractial(props.非流動資產, props.資產總額, 0)}</div>
                </div>
            </div>:null}
        </div>
        <div className="col-span-3 flex flex-col justify-start items-center border-r border-slate-200">
            <div className="flex flex-row relative items-center">
                {GLOBAL_FUNC.abbreviateNumber(props.負債總額)}
                <div className="absolute translate-x-16 rounded-full bg-slate-200 px-2 text-sm">{GLOBAL_FUNC.fractial(props.負債總額, props.資產總額, 0)}</div>
            </div>
            {openBox?<div className="flex flex-row justify-around w-full relative">
                <div className="bg-sky-100 rounded-full px-3 flex flex-row justify-center items-center">
                    {GLOBAL_FUNC.abbreviateNumber(props.流動負債, "流動負債")}
                    <div className="rounded-full bg-white px-2 ml-1 text-sm">{GLOBAL_FUNC.fractial(props.流動負債, props.負債總額, 0)}</div>
                </div>
                <div className="border-r border-black w-0 h-full"></div>
                <div className="bg-sky-100 rounded-full px-3 flex flex-row justify-center items-center">
                    {GLOBAL_FUNC.abbreviateNumber(props.非流動負債, "非流動負債")}
                    <div className="rounded-full bg-white px-2 ml-1 text-sm">{GLOBAL_FUNC.fractial(props.非流動負債, props.負債總額, 0)}</div>
                </div>
            </div>:null}
        </div>
        <div className="col-span-4 flex flex-col justify-between items-center px-7">
            <div className="flex flex-row relative items-center">
                {GLOBAL_FUNC.abbreviateNumber(props.權益總額)}
                <div className="absolute translate-x-16 rounded-full bg-slate-200 px-2 text-sm">{GLOBAL_FUNC.fractial(props.權益總額, props.資產總額, 0)}</div>
            </div>
            {openBox?<><div className="flex flex-row justify-around w-full relative border-b border-slate-800 pb-1">
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
            </>:null}
        </div>
    </div>
}