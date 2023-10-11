import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { MAIN_INDEX, Stock_all_day } from "../components/Dashboard/InterFaceDash";
import { blcSheetIF } from "../actions/APIs/apiInterface";

interface AllReportsIF{
    balanceSheet:BlcSheet_object_IF,
    incomeSheet:Stock_all_day[],
    cashFlowSheet:MAIN_INDEX[]
}
interface BlcSheet_object_IF{
    normal:blcSheetIF[]
    abnormal:blcSheetIF[]
    financial:blcSheetIF[]
    sercurities:blcSheetIF[]
    insurance:blcSheetIF[]
}

const initialState:AllReportsIF = {
    balanceSheet:{
        normal:[],
        abnormal:[],
        financial:[],
        sercurities:[],
        insurance:[]
    },
    incomeSheet:[],
    cashFlowSheet:[]
}

export const reportsSlice = createSlice({
    name: 'reports',
    initialState,
    reducers: {
        SET_BLC_NORMAL: (state, action:PayloadAction<blcSheetIF[]>) => {
            state.balanceSheet.normal = action.payload
        },
        SET_BLC_ABNORMAL: (state, action:PayloadAction<blcSheetIF[]>) => {
            state.balanceSheet.abnormal = action.payload
        },
        SET_BLC_FINANCIAL: (state, action:PayloadAction<blcSheetIF[]>) => {
            state.balanceSheet.financial = action.payload
        },
        SET_BLC_SECURITIES: (state, action:PayloadAction<blcSheetIF[]>) => {
            state.balanceSheet.sercurities = action.payload
        },
        SET_BLC_INSURANCE: (state, action:PayloadAction<blcSheetIF[]>) => {
            state.balanceSheet.insurance = action.payload
        },
        SET_INCOME_SHEET: (state, action:PayloadAction<Stock_all_day[]>) => {
            state.incomeSheet = action.payload
        },
        SET_CASHFLOW_SHEET:(state, action:PayloadAction<MAIN_INDEX[]>) => {
            state.cashFlowSheet = action.payload
        },
    }
})

export const {
    SET_BLC_NORMAL,
    SET_BLC_ABNORMAL,
    SET_BLC_FINANCIAL,
    SET_BLC_INSURANCE,
    SET_BLC_SECURITIES,
    SET_INCOME_SHEET,
    SET_CASHFLOW_SHEET
} = reportsSlice.actions

export const selectPage = (state: RootState) => state.reports

export default reportsSlice.reducer