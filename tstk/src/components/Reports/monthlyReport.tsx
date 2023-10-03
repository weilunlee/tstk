import { useEffect, useState } from "react"
import ApiSets from "../../actions/APIs/apiSets"
import { LayoutProps } from "../../interfaces/IfProps"
import { monthlyReportIF, monthlyReportIF_before } from "../../actions/APIs/apiInterface"
import { handleChineseAttr_MonthlyReport } from "../../actions/APIs/apiFuncs"
import GLOBAL_FUNC from "../../actions/globalFunc"

const MonthlyReport = ({setNavSelc, lastSelc}:LayoutProps):JSX.Element=>{
    const [revenueRow, setRevenueRow] = useState<monthlyReportIF[]>();

    useEffect(()=>{
        ApiSets.get_monthlyRevenue<monthlyReportIF_before[]>()
        .then(res=>{
            let arr = handleChineseAttr_MonthlyReport(JSON.stringify(res))
            let highest = [...arr].sort((a, b) => parseFloat(b.cumulative_revenue_curr) - parseFloat(a.cumulative_revenue_curr))
            setRevenueRow(highest)
        })
        .catch(err=>{console.log(err)})
    }, [])
    return <div className="MainContainer">
        <div className="bg-white rounded-xl shadow col-span-1">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row">
                    <div className="text-2xl font-extrabold pl-4 tracking-wider mr-2">R E V E N U E</div>
                    <div>{revenueRow && GLOBAL_FUNC.month(revenueRow[0].date_time)}</div>
                </div>
            </div>
            <div className="flex flex-row">
                <div className="w-40">code</div>
                <div className="flex justify-between w-40 pl-8 text-sm">
                    <div>十億</div><div>百萬</div><div>仟</div><div>個</div>
                </div>
                <div className="flex justify-between w-40 pl-8 text-sm ml-10">
                    <div>十億</div><div>百萬</div><div>仟</div><div>個</div>
                </div>
                <div className="w-40 flex justify-center">上月比較</div>
                <div className="w-40 flex justify-center">去年比較</div>
            </div>
            <div>
                {revenueRow?.map(res=><RevenueRow {...res} key={res.code}/>)}
            </div>
        </div>
    </div>
}

export default MonthlyReport

const RevenueRow=(props:monthlyReportIF):JSX.Element=>{
    return <div className="flex flex-row">
        <div className="w-40 flex flex-row">
            <div className="text-xs mr-4">{props.code}</div>
            <div className="flex items-center">{props.name}</div>
        </div>
        <div className="flex justify-end w-40">{(parseInt(props.cumulative_revenue_curr)*1000).toLocaleString("en-US")}</div>{/* (仟元 * 1000) */}
        <div className="flex justify-end w-40 ml-10">{(parseInt(props.operating_revenue_curr)*1000).toLocaleString("en-US")}</div>{/* (仟元 * 1000) */}

        <div className="flex justify-center w-40">{parseInt(props.operating_revenue_LM_compare)}%</div>
        <div className="flex justify-center w-40">{parseInt(props.operating_revenue_LY_compare)}%</div>
    </div>
}