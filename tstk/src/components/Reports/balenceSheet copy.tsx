import { useEffect, useState } from "react"
import ApiSets from "../../actions/APIs/apiSets"
import { LayoutProps } from "../../interfaces/IfProps"
import { blcSheetIF } from "../../actions/APIs/apiInterface"
import GLOBAL_FUNC from "../../actions/globalFunc"
import { Stock_all_day } from "../Dashboard/InterFaceDash"

interface blcsheet_with_stockInfo extends blcSheetIF{
    ClosingPrice:string,
    TradeValue:string,
    TradeVolume:string,
    Transaction:string,
}

const BalenceSheet = ({setNavSelc, lastSelc}:LayoutProps):JSX.Element=>{
    const [blcSheetRow, setBlcSheetRow] = useState<blcSheetIF[]>();
    const [allStock, setAllStock] = useState<Stock_all_day[]>();
    useEffect(()=>{
        ApiSets.get_StockAllDay<Stock_all_day[]>()
        .then(res=>{setAllStock(res)})
        .catch(err=>{console.log(err)})
    }, [])

    useEffect(()=>{
        ApiSets.get_balenceSheet<blcSheetIF[]>()
        .then(res=>{
            ApiSets.get_balenceSheet_financial<blcSheetIF[]>()
            .then(res1=>{
                let highest = [...res, ...res1].sort((a, b) => parseFloat(b.資產總額) - parseFloat(a.資產總額))
                setBlcSheetRow(highest)
            })
        })
        .catch(err=>{console.log(err)})
    }, [])
    
    return <div className="MainContainer">
        <div className="bg-white rounded-xl shadow col-span-1">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row">
                    <div className="text-2xl font-extrabold pl-4 tracking-wider mr-2">資 產 負 債 表 </div>
                    <div>{blcSheetRow && GLOBAL_FUNC.month(blcSheetRow[0].季別)}</div>
                    <div>{blcSheetRow && blcSheetRow.length}</div>
                </div>
            </div>
            <div className="grid grid-cols-12 text-l font-bold text-white">
                <div className="col-span-2 flex justify-center text-black">C O M P A N Y</div>
                <div className="col-span-3 flex justify-center bg-pink-600">A S S E T S</div>
                <div className="col-span-3 flex justify-center bg-emerald-600">L I A B I L I T Y</div>
                <div className="col-span-4 flex justify-center bg-slate-700">E Q U I T Y</div>
            </div>
            <div className="scrollbar overflow-auto" style={{height:" calc(100vh - 5rem)"}}>
                {allStock?
                    blcSheetRow?.map(res=>{
                        let _stock:Stock_all_day = allStock.filter(stock=>stock.Code===res.公司代號)[0]
                        if(!_stock) return null
                        let _arr:blcsheet_with_stockInfo = {...res, ...{
                                ClosingPrice:_stock.ClosingPrice,
                                TradeValue:_stock.TradeValue,
                                TradeVolume:_stock.TradeVolume,
                                Transaction:_stock.Transaction
                            }}
                        return <CompanyRow {..._arr} key={res.公司代號} />
                    })
                :null}
            </div>
        </div>
    </div>
}

export default BalenceSheet

const CompanyRow=(props:blcsheet_with_stockInfo):JSX.Element=>{
    const [openBox, setOpenBox] = useState(false);
    function toggoleBox():void{ setOpenBox(!openBox) }
    return <div className={`grid grid-cols-12 border-b cursor-default ${openBox?"h-24":""}`} onClick={toggoleBox}>
        <div className="col-span-2 flex flex-col">
            <div className="flex flex-row">
                <div className="text-xs flex justify-center w-20">{props.公司代號}</div>
                <div className="flex w-32">{props.公司名稱}</div>
            </div>
            {openBox?<div>
                <div>{props.每股參考淨值}</div>
                <div>{props.ClosingPrice}</div>
            </div>:""}
        </div>
        <div className="col-span-3 flex flex-col justify-start items-center bg-pink-200">
            <div>{GLOBAL_FUNC.abbreviateNumber(props.資產總額)}</div>{/* (仟元 * 1000) */}
            {openBox?<div className="flex flex-row justify-around w-full relative">
                <div className="bg-fuchsia-100 rounded-full px-3 flex flex-row justify-center items-center">
                    {GLOBAL_FUNC.abbreviateNumber(props.流動資產, "流動資產")}
                    <div className="absolute translate-x-16 rounded-full bg-white px-2 text-sm">{fractial(props.流動資產, props.資產總額)}</div>
                </div>
                <div className="bg-fuchsia-100 rounded-full px-3 flex flex-row justify-center items-center">
                    {GLOBAL_FUNC.abbreviateNumber(props.非流動資產, "非流動資產")}
                    <div className="absolute translate-x-16 rounded-full bg-white px-2 text-sm">{fractial(props.非流動資產, props.資產總額)}</div>
                </div>
            </div>:null}
        </div>
        <div className="col-span-3 flex flex-col justify-start items-center bg-green-200">
            <div className="flex flex-row relative items-center">
                {GLOBAL_FUNC.abbreviateNumber(props.負債總額)}
                <div className="absolute translate-x-16 rounded-full bg-white px-2 text-sm">{fractial(props.負債總額, props.資產總額)}</div>
            </div>
            {openBox?<div className="flex flex-row justify-around w-full relative">
                <div className="bg-sky-100 rounded-full px-3 flex flex-row justify-center items-center">
                    {GLOBAL_FUNC.abbreviateNumber(props.流動負債, "流動負債")}
                    <div className="absolute translate-x-16 rounded-full bg-white px-2 text-sm">{fractial(props.流動負債, props.負債總額)}</div>
                </div>
                <div className="bg-sky-100 rounded-full px-3 flex flex-row justify-center items-center">
                    {GLOBAL_FUNC.abbreviateNumber(props.非流動負債, "非流動負債")}
                    <div className="absolute translate-x-16 rounded-full bg-white px-2 text-sm">{fractial(props.非流動負債, props.負債總額)}</div>
                </div>
            </div>:null}
        </div>
        <div className="col-span-4 flex flex-col justify-between items-center bg-slate-200 px-7">
            <div className="flex flex-row relative items-center">
                {GLOBAL_FUNC.abbreviateNumber(props.權益總額)}
                <div className="absolute translate-x-16 rounded-full bg-white px-2 text-sm">{fractial(props.權益總額, props.資產總額)}</div>
            </div>
            {openBox?<><div className="flex flex-row justify-around w-full relative border-b border-slate-800 pb-1">
                <div className="">一般權益</div>
                <div className="bg-white rounded-full px-3">{GLOBAL_FUNC.abbreviateNumber(props.保留盈餘, "保留盈餘")}</div>
                <div className="bg-white rounded-full px-3">{GLOBAL_FUNC.abbreviateNumber(props.股本, "股本")}</div>
                <div className="bg-white rounded-full px-3">{GLOBAL_FUNC.abbreviateNumber(props.資本公積, "資本公積")}</div>
            </div>
            <div className="flex flex-row justify-around w-full relative mb-2">
                <div>特殊權益</div>
                <div className="bg-white rounded-full px-3">{GLOBAL_FUNC.abbreviateNumber(props.其他權益, "其他權益")}</div>
                <div className="bg-white rounded-full px-3">{GLOBAL_FUNC.abbreviateNumber(props.非控制權益, "非控制權益")}</div>
                <div className="bg-white rounded-full px-3">{GLOBAL_FUNC.abbreviateNumber(props.庫藏股票, "庫藏股")}</div>
            </div>
            </>:null}
        </div>
    </div>
}

function fractial(Numerator:string, denominator:string):string{
    let _re = (parseInt(Numerator)*100/parseInt(denominator)).toFixed(0)
    return _re.toString()+"%"
}