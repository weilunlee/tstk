export interface GetOrederList{
    id:number,
    month:number
}

export interface OrderInterface{
    id:number,
    name:string,
    customer_id: string,
    place_time:string,
    payment_status:number,
    payment_time:string,
    product_status:number,
    shipping_status:number,
    shipping_time:string,
    arrive_time:string,
    optional:string,
    created_at:string,
    updated_at:string
}

export interface PostOrder{
    name:string,
    customer_id: string,
    optional: string
}

export interface monthlyReportIF{
    remark:string,
    code:string,
    name:string,
    export_time:string,
    // 上月
    operating_revenue_LM:string,
    operating_revenue_LM_compare:string,
    // 去年
    operating_revenue_LY_compare:string,
    operating_revenue_LY:string,
    // 當月
    operating_revenue_curr:string,
    industry:string,
    cumulative_revenue_LM_compare:string,
    cumulative_revenue_LY:string,
    cumulative_revenue_curr:string,
    date_time:string,
}

export interface monthlyReportIF_before {
    "備註":string,                      // "remark",
    "公司代號":string,                      // "code",
    "公司名稱":string,                      // "nane",
    "出表日期":string,                      // "export_time",
    // 上月
    "營業收入-上月營收":string,     // (仟元)               // "operating_revenue_LM",
    "營業收入-上月比較增減(%)":string,                      // "operating_revenue_LM_compare",
    // 去年
    "營業收入-去年同月增減(%)":string,                      // "operating_revenue_LY_compare",
    "營業收入-去年當月營收":string,                      // "operating_revenue_LY",
    // 當月
    "營業收入-當月營收":string,                      // "operating_revenue_curr",
    "產業別":string,                      // "industry",
    "累計營業收入-前期比較增減(%)":string,                      // "cumulative_revenue_LM_compare",
    "累計營業收入-去年累計營收":string,                      // "cumulative_revenue_LY",
    "累計營業收入-當月累計營收":string,                      // "cumulative_revenue_curr",
    "資料年月":string,                      // "date_time",
}

export interface blcSheetIF{
    "保留盈餘":string,
    "公司代號":string,
    "公司名稱":string,
    "共同控制下前手權益":string,
    "其他權益":string,
    "出表日期":string,
    "合併前非屬共同控制股權":string,
    "季別":string,
    "年度":string,
    "庫藏股票":string,
    "待註銷股本股數":string,
    "權益─具證券性質之虛擬通貨":string,
    "權益總額":string,
    "歸屬於母公司業主之權益合計":string,
    "母公司暨子公司所持有之母公司庫藏股股數":string,
    "每股參考淨值":string,
    "流動負債":string,
    "流動資產":string,
    "股本":string,
    "負債總額":string,
    "資本公積":string,
    "資產總額":string,
    "非控制權益":string,
    "非流動負債":string,
    "非流動資產":string,
    "預收股款（權益項下）之約當發行股數":string,
}

export interface blcSheetIF_public{             // for 公開發行公司
    "保留盈餘":string,
    "公司代號":string,
    "公司名稱":string,
    "共同控制下前手權益":string,
    "其他權益":string,
    "出表日期":string,
    "合併前非屬共同控制股權":string,
    "季別":string,
    "年度":string,
    "庫藏股票":string,
    "待註銷股本股數（單位：股）":string,
    "權益─具證券性質之虛擬通貨":string,
    "權益總計":string,
    "歸屬於母公司業主之權益合計":string,
    "母公司暨子公司所持有之母公司庫藏股股數（單位：股）":string,
    "每股參考淨值":string,
    "流動負債":string,
    "流動資產":string,
    "股本":string,
    "負債總計":string,
    "資本公積":string,
    "資產總計":string,
    "非控制權益":string,
    "非流動負債":string,
    "非流動資產":string,
    "預收股款（權益項下）之約當發行股數（單位：股）":string,
}

export interface incStatementIF{
    "停業單位損益":string,
    "公司代號":string,
    "公司名稱":string,
    "其他收益及費損淨額":string,
    "其他綜合損益（淨額）":string,
    "出表日期":string,
    "原始認列生物資產及農產品之利益（損失）":string,
    "合併前非屬共同控制股權損益":string,
    "合併前非屬共同控制股權綜合損益淨額":string,
    "基本每股盈餘（元）":string,
    "季別":string,
    "已實現銷貨（損）益":string,
    "年度":string,
    "所得稅費用（利益）":string,
    "未實現銷貨（損）益":string,
    "本期淨利（淨損）":string,
    "本期綜合損益總額":string,
    "淨利（淨損）歸屬於共同控制下前手權益":string,
    "淨利（淨損）歸屬於母公司業主":string,
    "淨利（淨損）歸屬於非控制權益":string,
    "營業利益（損失）":string,
    "營業外收入及支出":string,
    "營業成本":string,
    "營業收入":string,
    "營業毛利（毛損）":string,
    "營業毛利（毛損）淨額":string,
    "營業費用":string,
    "生物資產當期公允價值減出售成本之變動利益（損失）":string,
    "稅前淨利（淨損）":string,
    "綜合損益總額歸屬於共同控制下前手權益":string,
    "綜合損益總額歸屬於母公司業主":string,
    "綜合損益總額歸屬於非控制權益":string,
    "繼續營業單位本期淨利（淨損）":string
}