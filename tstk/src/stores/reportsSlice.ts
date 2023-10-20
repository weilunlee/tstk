import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { MAIN_INDEX } from "../components/Dashboard/InterFaceDash";
import { blcSheetIF, incStatementIF } from "../actions/APIs/apiInterface";
import { blcSheet_default, incStatement_default } from "./default_state";

interface AllReportsIF{
    balanceSheet:BlcSheet_object_IF,
    incomeSheet:IncStatement_object_IF,
    cashFlowSheet:MAIN_INDEX[],
    reportSelc:{
        balanceSheet:blcSheetIF,
        incomeSheet:incStatementIF
    }
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
const sheetSet = {
    normal:[],
    abnormal:[],
    financial:[],
    sercurities:[],
    insurance:[]
}
const initialState:AllReportsIF = {
    reportSelc:{
        balanceSheet:blcSheet_default,
        incomeSheet:incStatement_default
    },
    balanceSheet:sheetSet,
    incomeSheet:sheetSet,
    cashFlowSheet:[]
}

export const reportsSlice = createSlice({
    name: 'reports',
    initialState,
    reducers: {
        REPORT_CHOSEN:(state, action:PayloadAction<string>)=>{
            let _str = action.payload
            let _normalBS = state.balanceSheet.normal.filter(res=>res.公司代號.search(_str)!==-1)
            let _abnormalBS = state.balanceSheet.abnormal.filter(res=>res.公司代號.search(_str)!==-1)
            let _finBS = state.balanceSheet.financial.filter(res=>res.公司代號.search(_str)!==-1)
            let _secBS = state.balanceSheet.sercurities.filter(res=>res.公司代號.search(_str)!==-1)
            let _insBS = state.balanceSheet.insurance.filter(res=>res.公司代號.search(_str)!==-1)
            state.reportSelc.balanceSheet = [..._normalBS, ..._abnormalBS, ..._finBS, ..._secBS, ..._insBS][0]

            let _normalIS = state.incomeSheet.normal.filter(res=>res.公司代號.search(_str)!==-1)
            let _abnormalIS  = state.incomeSheet.abnormal.filter(res=>res.公司代號.search(_str)!==-1)
            let _finIS = state.incomeSheet.financial.filter(res=>res.公司代號.search(_str)!==-1)
            let _secIS = state.incomeSheet.sercurities.filter(res=>res.公司代號.search(_str)!==-1)
            let _insIS = state.incomeSheet.insurance.filter(res=>res.公司代號.search(_str)!==-1)
            state.reportSelc.incomeSheet = [..._normalIS, ..._abnormalIS, ..._finIS, ..._secIS, ..._insIS][0]
        },
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
    REPORT_CHOSEN,
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