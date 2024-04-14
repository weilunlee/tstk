import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { RevenueIF } from "../interfaces/IfAPI";

export interface searchBarIF{ Code:string, Name:string }
interface RevenueState{
    stocks:RevenueIF[],
    etfs:RevenueIF[],
}

const initialState:RevenueState = {
    stocks:[],
    etfs:[]
}

export const stockInfoSlice = createSlice({
    name: 'stocks',
    initialState,
    reducers: {
        SET_STOCKS_REVENUE: (state, action:PayloadAction<RevenueIF[]>) => {
            state.stocks = action.payload
        },
        SET_ETFS_REVENUE: (state, action:PayloadAction<RevenueIF[]>) => {
            state.etfs = action.payload
        }
    }
})

export const {
    SET_STOCKS_REVENUE,
    SET_ETFS_REVENUE,
} = stockInfoSlice.actions

export const selectPage = (state: RootState) => state.stocks

export default stockInfoSlice.reducer