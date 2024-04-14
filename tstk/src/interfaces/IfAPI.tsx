export interface newListing_fromFetch{
    AgreementDate:string,
    "AmountofCapital ": string,
    ApplicationDate: string,
    ApprovedDate: string,
    ApprovedListingDate: string,
    Chairman: string,
    Code: string,
    CommitteeDate: string,
    Company: string,
    ListingDate: string,
    Note: string,
    Underwriter: string,
    UnderwritingPrice: string
}

export interface deListed_fromFetch{
    DelistingDate:string,
    Company : string,
    Code: string
}

export interface news_fromFetch{
    "主旨 ": string,
    事實發生日: string,
    公司代號: string,
    公司名稱: string,
    出表日期: string,
    發言日期: string,
    發言時間: string,
    符合條款: string,
    說明: string
}

export interface EPS_fromFetch{
    出表日期: string,
    年度: string,
    季別: string,
    公司代號: string,
    公司名稱: string,
    產業別: string,
    "基本每股盈餘(元)": string,
    普通股每股面額: string,
    營業收入: string,
    營業利益: string,
    營業外收入及支出: string,
    稅後淨利: string
}
