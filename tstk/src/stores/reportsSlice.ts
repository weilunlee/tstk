import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { MAIN_INDEX } from "../components/Dashboard/InterFaceDash";
import { blcSheetIF, incStatementIF } from "../actions/APIs/apiInterface";

interface AllReportsIF{
    balanceSheet:BlcSheet_object_IF,
    incomeSheet:IncStatement_object_IF,
    cashFlowSheet:MAIN_INDEX[]
}

interface BlcSheet_object_IF{
    normal:blcSheetIF[]
    abnormal:blcSheetIF[]
    financial:blcSheetIF[]
    sercurities:blcSheetIF[]
    insurance:blcSheetIF[]
}
interface IncStatement_object_IF{
    normal:incStatementIF[]
    abnormal:incStatementIF[]
    financial:incStatementIF[]
    sercurities:incStatementIF[]
    insurance:incStatementIF[]
}
const initialState:AllReportsIF = {
    balanceSheet:{
        normal:[],
        abnormal:[],
        financial:[],
        sercurities:[],
        insurance:[]
    },
    incomeSheet:{
        normal:[],
        abnormal:[],
        financial:[],
        sercurities:[],
        insurance:[]
    },
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
        SET_INC_NORMAL: (state, action:PayloadAction<incStatementIF[]>) => {
            state.incomeSheet.normal = action.payload
        },
        SET_INC_FINANCIAL: (state, action:PayloadAction<incStatementIF[]>) => {
            state.incomeSheet.financial = action.payload
        },
        SET_INC_SECURITIES: (state, action:PayloadAction<incStatementIF[]>) => {
            state.incomeSheet.sercurities = action.payload
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
    SET_INC_NORMAL,
    SET_INC_FINANCIAL,
    SET_INC_SECURITIES,
    SET_CASHFLOW_SHEET
} = reportsSlice.actions

export const selectPage = (state: RootState) => state.reports

export default reportsSlice.reducer