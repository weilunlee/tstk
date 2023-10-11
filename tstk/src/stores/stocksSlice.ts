import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { MAIN_INDEX, Stock_all_day } from "../components/Dashboard/InterFaceDash";

interface allStocks{
    stocks:Stock_all_day[],
    etfs:Stock_all_day[],
    mainIndex:MAIN_INDEX[]
}

const initialState:allStocks = {
    stocks:[],
    etfs:[],
    mainIndex:[]
}

export const stocksSlice = createSlice({
    name: 'stocks',
    initialState,
    reducers: {
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
    SET_STOCKS,
    SET_ETFS,
    SET_MIS
} = stocksSlice.actions

export const selectPage = (state: RootState) => state.stocks

export default stocksSlice.reducer