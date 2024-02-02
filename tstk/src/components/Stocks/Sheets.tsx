import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../stores/hooks"
import { Stock_all_day } from "../Dashboard/InterFaceDash"
import { REPORT_CHOSEN } from "../../stores/reportsSlice"
import GLOBAL_FUNC from "../../actions/globalFunc"

function IndividualSheet(stock:Stock_all_day):JSX.Element{
    const blcSheet = useAppSelector(state=>state.reports.reportSelc.balanceSheet)
    const incStatement = useAppSelector(state=>state.reports.reportSelc.incomeSheet)
    const [spread, setSpread] = useState(false);
    function toggleSpread(){setSpread(!spread)}
    const dispatch = useAppDispatch()
    useEffect(()=>{dispatch(REPORT_CHOSEN(stock.Code))}, [dispatch, stock])
    return  <>{blcSheet?<div className="w-96 bg-white rounded-xl p-2 col-span-1">
        <div className="col-span-2 font-bold my-2 mx-5">資產負債表</div>
        <div className="grid grid-cols-2 items-start">
            <div className="flex flex-col items-center border-r">
                <div className="mb-2">ASSEST</div>
                <div className="flex w-full justify-between px-3"><div>流動資產</div>{GLOBAL_FUNC.abbreviateNumber(blcSheet.流動資產, "流動資產")}</div>
                <div className="flex w-full justify-between px-3"><div>固定資產</div>{GLOBAL_FUNC.abbreviateNumber(blcSheet.非流動資產, "非流動資產")}</div>
                <div className="font-bold flex w-full justify-between px-3"><div>總資產</div>{GLOBAL_FUNC.abbreviateNumber(blcSheet.資產總額, "資產總額")}</div>

            </div>
            <div className="flex flex-col items-center">
                <div className="mb-2">LIABILITY & EQUITY</div>
                <div className="flex w-full justify-between px-3"><div>流動負債</div>{GLOBAL_FUNC.abbreviateNumber(blcSheet.流動負債, "負債總額")}</div>
                <div className="flex w-full justify-between px-3"><div>非流動負債</div>{GLOBAL_FUNC.abbreviateNumber(blcSheet.非流動負債, "非流動資產")}</div>
                <div className="font-bold flex w-full justify-between px-3"><div>負債總額</div>{GLOBAL_FUNC.abbreviateNumber(blcSheet.負債總額, "負債總額")}</div>
                <div className="h-3"></div>
                <div className="flex w-full justify-between px-3"><div>保留盈餘</div>{GLOBAL_FUNC.abbreviateNumber(blcSheet.保留盈餘, "保留盈餘")}</div>
                <div className="flex w-full justify-between px-3"><div>股本</div>{GLOBAL_FUNC.abbreviateNumber(blcSheet.股本, "股本")}</div>
                <div className="flex w-full justify-between px-3"><div>資本公積</div>{GLOBAL_FUNC.abbreviateNumber(blcSheet.資本公積, "資本公積")}</div>
                <div className="flex w-full justify-between px-3"><div>庫藏股票</div>{GLOBAL_FUNC.abbreviateNumber(blcSheet.庫藏股票, "庫藏股票")}</div>
                <div className="flex w-full justify-between px-3"><div>其他權益</div>{GLOBAL_FUNC.abbreviateNumber(blcSheet.其他權益, "其他權益")}</div>
                <div className="flex w-full justify-between px-3"><div>非控制權益</div>{GLOBAL_FUNC.abbreviateNumber(blcSheet.非控制權益, "非控制權益")}</div>
                <div className="font-bold flex w-full justify-between px-3"><div>權益總額</div>{GLOBAL_FUNC.abbreviateNumber(blcSheet.權益總額, "權益總額")}</div>
            </div>
        </div>
    </div>:<div>無資產負債表</div>}
    {incStatement?<div className="w-96 bg-white rounded-xl p-2 col-span-1">
        <div className="col-span-2 font-bold my-2 flex flex-row items-center justify-between mx-5">
            <div>損益表</div>
            <div onClick={toggleSpread} className={`border-black cursor-pointer ${spread?"-rotate-[135deg]":"rotate-45"} -translate-y-1/2 border-b border-r w-2 h-2`}></div>
        </div>
        <div className="col-span-2 my-2">主要營業項目</div>
        <div className="flex w-full justify-between px-3"><div>營業收入</div>{GLOBAL_FUNC.abbreviateNumber(incStatement.營業收入, "營業收入")}</div>
        <div className="flex w-full justify-between px-3 border-b"><div className="text-red-700">營業成本</div>{GLOBAL_FUNC.abbreviateNumber(incStatement.營業成本, "營業成本")}</div>
        <div className="flex w-full justify-between px-3"><div>營業毛利</div>{GLOBAL_FUNC.abbreviateNumber(incStatement["營業毛利（毛損）"], "營業毛利")}</div>
        <div className="col-span-2 my-2">經營</div>
        <div className="flex w-full justify-between px-3 border-b"><div className="text-red-700"
        >營業費用</div>{GLOBAL_FUNC.abbreviateNumber(incStatement.營業費用, "營業收入")}</div>
        <div className="flex w-full justify-between px-3"><div>營業利益</div>{GLOBAL_FUNC.abbreviateNumber(incStatement["營業利益（損失）"], "營業利益")}</div>
        <div className="col-span-2 my-2">業外</div>
        <div className="flex w-full justify-between px-3 border-b"><div>營業外收入及支出</div>{GLOBAL_FUNC.abbreviateNumber(incStatement.營業外收入及支出, "營業外收入及支出")}</div>
        <div className="flex w-full justify-between px-3"><div>稅前淨利</div>{GLOBAL_FUNC.abbreviateNumber(incStatement["稅前淨利（淨損）"], "稅前淨利")}</div>
        <div className="flex w-full justify-between px-3 border-b"><div className="text-red-700">所得稅費用</div>{GLOBAL_FUNC.abbreviateNumber(incStatement["所得稅費用（利益）"], "所得稅費用")}</div>
        <div className="flex w-full justify-between px-3"><div>本期淨利</div>{GLOBAL_FUNC.abbreviateNumber(incStatement["本期淨利（淨損）"], "本期淨利")}</div>
        {spread?<>
        <div className="flex w-full justify-between px-3 mt-2"><div>其他收益及費損淨額</div>{GLOBAL_FUNC.abbreviateNumber(incStatement.其他收益及費損淨額, "其他收益及費損淨額")}</div>
        <div className="flex w-full justify-between px-3"><div>其他綜合損益（淨額）</div>{GLOBAL_FUNC.abbreviateNumber(incStatement["其他綜合損益（淨額）"], "其他綜合損益（淨額）")}</div>
        <div className="flex w-full justify-between px-3"><div>原始認列生物資產及農產品之利益（損失）</div>{GLOBAL_FUNC.abbreviateNumber(incStatement["原始認列生物資產及農產品之利益（損失）"], "原始認列生物資產及農產品之利益（損失）")}</div>
        <div className="flex w-full justify-between px-3"><div>合併前非屬共同控制股權損益</div>{GLOBAL_FUNC.abbreviateNumber(incStatement.合併前非屬共同控制股權損益, "合併前非屬共同控制股權損益")}</div>
        <div className="flex w-full justify-between px-3"><div>合併前非屬共同控制股權綜合損益淨額</div>{GLOBAL_FUNC.abbreviateNumber(incStatement.合併前非屬共同控制股權綜合損益淨額, "合併前非屬共同控制股權綜合損益淨額")}</div>
        <div className="flex w-full justify-between px-3"><div>已實現銷貨（損）益</div>{GLOBAL_FUNC.abbreviateNumber(incStatement["已實現銷貨（損）益"], "已實現銷貨（損）益")}</div>
        <div className="flex w-full justify-between px-3"><div>未實現銷貨（損）益</div>{GLOBAL_FUNC.abbreviateNumber(incStatement["未實現銷貨（損）益"], "未實現銷貨（損）益")}</div>
        <div className="flex w-full justify-between px-3"><div>本期綜合損益總額</div>{GLOBAL_FUNC.abbreviateNumber(incStatement.本期綜合損益總額, "本期綜合損益總額")}</div>
        <div className="flex w-full justify-between px-3"><div>淨利（淨損）歸屬於共同控制下前手權益</div>{GLOBAL_FUNC.abbreviateNumber(incStatement["淨利（淨損）歸屬於共同控制下前手權益"], "淨利（淨損）歸屬於共同控制下前手權益")}</div>
        <div className="flex w-full justify-between px-3"><div>淨利（淨損）歸屬於母公司業主</div>{GLOBAL_FUNC.abbreviateNumber(incStatement["淨利（淨損）歸屬於母公司業主"], "淨利（淨損）歸屬於母公司業主")}</div>
        <div className="flex w-full justify-between px-3"><div>淨利（淨損）歸屬於非控制權益</div>{GLOBAL_FUNC.abbreviateNumber(incStatement["淨利（淨損）歸屬於非控制權益"], "淨利（淨損）歸屬於非控制權益")}</div>
        <div className="flex w-full justify-between px-3"><div>生物資產當期公允價值減出售成本之變動利益</div>{GLOBAL_FUNC.abbreviateNumber(incStatement["生物資產當期公允價值減出售成本之變動利益（損失）"], "生物資產當期公允價值減出售成本之變動利益")}</div>
        <div className="flex w-full justify-between px-3"><div>綜合損益總額歸屬於共同控制下前手權益</div>{GLOBAL_FUNC.abbreviateNumber(incStatement.綜合損益總額歸屬於共同控制下前手權益, "綜合損益總額歸屬於共同控制下前手權益")}</div>
        <div className="flex w-full justify-between px-3"><div>綜合損益總額歸屬於母公司業主</div>{GLOBAL_FUNC.abbreviateNumber(incStatement.綜合損益總額歸屬於母公司業主, "綜合損益總額歸屬於母公司業主")}</div>
        <div className="flex w-full justify-between px-3"><div>綜合損益總額歸屬於非控制權益</div>{GLOBAL_FUNC.abbreviateNumber(incStatement.綜合損益總額歸屬於非控制權益, "綜合損益總額歸屬於非控制權益")}</div>
        <div className="flex w-full justify-between px-3"><div>繼續營業單位本期淨利</div>{GLOBAL_FUNC.abbreviateNumber(incStatement["繼續營業單位本期淨利（淨損）"], "繼續營業單位本期淨利")}</div></>:null}
        <div className="flex w-full justify-between px-3"><div>基本每股盈餘</div>{GLOBAL_FUNC.abbreviateNumber(incStatement["基本每股盈餘（元）"], "基本每股盈餘（元）")}</div>
    </div>:<div>無損益表</div>}
    </>
}

export default IndividualSheet