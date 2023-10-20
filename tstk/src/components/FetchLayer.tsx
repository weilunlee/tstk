import { useEffect } from "react"
import { useAppDispatch } from "../stores/hooks"
import ApiSets from "../actions/APIs/apiSets"
import { blcSheetIF, incStatementIF } from "../actions/APIs/apiInterface"
import { SET_BLC_FINANCIAL, SET_BLC_NORMAL, SET_BLC_SECURITIES, SET_INC_FINANCIAL, SET_INC_NORMAL, SET_INC_SECURITIES } from "../stores/reportsSlice"

function FetchLayer():JSX.Element{
    const dispatch = useAppDispatch()

    useEffect(()=>{
        ApiSets.get_balenceSheet<blcSheetIF[]>()
        .then(res=>{dispatch(SET_BLC_NORMAL(res))})
        .catch(err=>{console.log(err)})
    }, [dispatch])
    useEffect(()=>{
        ApiSets.get_balenceSheet_financial<blcSheetIF[]>()
        .then(res=>{dispatch(SET_BLC_FINANCIAL(res))})
        .catch(err=>{console.log(err)})
    }, [dispatch])
    useEffect(()=>{
        ApiSets.get_balenceSheet_securities<blcSheetIF[]>()
        .then(res=>{dispatch(SET_BLC_SECURITIES(res))})
        .catch(err=>{console.log(err)})
    }, [dispatch])
    useEffect(()=>{
        ApiSets.get_incomeStatement<incStatementIF[]>()
        .then(res=>{dispatch(SET_INC_NORMAL(res))})
        .catch(err=>{console.log(err)})
    }, [dispatch])
    useEffect(()=>{
        ApiSets.get_incomeStatement_financial<incStatementIF[]>()
        .then(res=>{dispatch(SET_INC_FINANCIAL(res))})
        .catch(err=>{console.log(err)})
    }, [dispatch])
    useEffect(()=>{
        ApiSets.get_incomeStatement_securities<incStatementIF[]>()
        .then(res=>{dispatch(SET_INC_SECURITIES(res))})
        .catch(err=>{console.log(err)})
    }, [dispatch])

    return <></>
}

export default FetchLayer