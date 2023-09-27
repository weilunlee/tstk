export interface MAIN_INDEX{
    指數:string,
    收盤指數:string,
    漲跌:string,
    漲跌百分比:string,
    漲跌點數:string,
    特殊處理註記:string,
}
export interface Stock_all_day{
    Change:string,
    ClosingPrice:string,
    Code:string,
    HighestPrice:string,
    LowestPrice:string,
    Name:string,
    OpeningPrice:string,
    TradeValue:string,
    TradeVolume:string,
    Transaction:string,
}
export interface MI20_If extends Stock_all_day{
    Dir:string,
    LastBestAskPrice:string,
    LastBestBidPrice:string,
    Rank:string,
}