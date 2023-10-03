import { monthlyReportIF } from "./apiInterface";

export function handleChineseAttr_MonthlyReport(jsonStr:string):monthlyReportIF[]{
    jsonStr = jsonStr.replaceAll("備註", "remark").replaceAll("公司代號", "code").replaceAll("公司名稱", "name").replaceAll("出表日期", "export_time").replaceAll("營業收入-上月營收", "operating_revenue_LM").replaceAll("營業收入-上月比較增減(%)", "operating_revenue_LM_compare").replaceAll("營業收入-去年同月增減(%)", "operating_revenue_LY_compare").replaceAll("營業收入-去年當月營收", "operating_revenue_LY").replaceAll("營業收入-當月營收", "operating_revenue_curr").replaceAll("產業別", "industry").replaceAll("累計營業收入-前期比較增減(%)", "cumulative_revenue_LM_compare").replaceAll("累計營業收入-去年累計營收", "cumulative_revenue_LY").replaceAll("累計營業收入-當月累計營收", "cumulative_revenue_curr").replaceAll("資料年月", "date_time")
    return JSON.parse(jsonStr)
}

// var mapMonReport = {
//     "備註":"remark",
//     "公司代號":"code",
//     "公司名稱":"nane",
//     "出表日期":"export_time",
//     // 上月
//     "營業收入-上月營收":"operating_revenue_LM",
//     "營業收入-上月比較增減(%)":"operating_revenue_LM_compare",
//     // 去年
//     "營業收入-去年同月增減(%)":"operating_revenue_LY_compare",
//     "營業收入-去年當月營收":"operating_revenue_LY",
//     // 當月
//     "營業收入-當月營收":"operating_revenue_curr",
//     "產業別":"industry",
//     "累計營業收入-前期比較增減(%)":"cumulative_revenue_LM_compare",
//     "累計營業收入-去年累計營收":"cumulative_revenue_LY",
//     "累計營業收入-當月累計營收":"cumulative_revenue_curr",
//     "資料年月":"date_time",
// }