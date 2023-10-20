import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { MAIN_INDEX, Stock_all_day } from "../components/Dashboard/InterFaceDash";

export interface searchBarIF{ Code:string, Name:string }
interface allStocks{
    stocks:Stock_all_day[],
    etfs:Stock_all_day[],
    mainIndex:MAIN_INDEX[],
    stockSelc:Stock_all_day,
    searchBarList:searchBarIF[]
}

const initialState:allStocks = {
    stocks:[],
    etfs:[],
    mainIndex:[],
    stockSelc:{
        Change:"",
        ClosingPrice:"",
        Code:"",
        HighestPrice:"",
        LowestPrice:"",
        Name:"",
        OpeningPrice:"",
        TradeValue:"",
        TradeVolume:"",
        Transaction:"",
    },
    searchBarList:[{Code:"", Name:""}]
}

export const stocksSlice = createSlice({
    name: 'stocks',
    initialState,
    reducers: {
        SEARCH_STOCK:(state, action:PayloadAction<string>) => {
            let _str = action.payload
            let _stock = state.stocks.filter(res=>res.Code.search(_str)!==-1)
            let _etf = state.etfs.filter(res=>res.Code.search(_str)!==-1)
            if(![..._stock, ..._etf][0]){
                _stock = state.stocks.filter(res=>res.Name.search(_str)!==-1)
                _etf = state.etfs.filter(res=>res.Name.search(_str)!==-1)
            }
            let _returnArr = [..._stock, ..._etf].map(res=>{return {Code:res.Code, Name:res.Name}})
            state.searchBarList = _returnArr
        },
        STOCK_CHOSEN:(state, action:PayloadAction<string>) => {
            let _stockCode = state.stocks.filter(res=>res.Code===action.payload)
            let _etfCode = state.etfs.filter(res=>res.Code===action.payload)
            let _stockName = state.stocks.filter(res=>res.Name===action.payload)
            let _etfName = state.etfs.filter(res=>res.Name===action.payload)
            let _return = [..._stockCode, ..._etfCode, ..._stockName, ..._etfName][0]
            if(!_return) return
            state.stockSelc = _return
        },
        STOCK_RESET:(state) => {
            state.stockSelc = initialState.stockSelc
        },
        SET_STOCKS: (state, action:PayloadAction<Stock_all_day[]>) => {
            state.stocks = action.payload
        },
        SET_ETFS: (state, action:PayloadAction<Stock_all_day[]>) => {
            state.etfs = action.payload
        },
        SET_MIS:(state, action:PayloadAction<MAIN_INDEX[]>) => {
            state.mainIndex = action.payload
        },
    }
})

export const {
    SEARCH_STOCK,
    STOCK_CHOSEN,
    STOCK_RESET,
    SET_STOCKS,
    SET_ETFS,
    SET_MIS
} = stocksSlice.actions

export const selectPage = (state: RootState) => state.stocks

export default stocksSlice.reducer