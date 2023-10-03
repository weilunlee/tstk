import GLOBAL_VAR from "../../assests/globalAttr/globalVar";
import api, { paramsIF } from "./api";

export default class ApiSets{
    _news:string = "/news/"
    _stockInfo:string = "/stockInfo/"
    _governance:string = "/governance/"

    static async get_main_index<TResponse>():Promise<TResponse>{
        // url = http://localhost:8000/MI_INDEX
        let params:paramsIF = {
            type:"MI_INDEX",
            router:"stockInfo/",
            data:{}
        }
        return api("GET", params, JSON.stringify(params.data))
    }

    static async get_MI20<TResponse>():Promise<TResponse>{
        // url = http://localhost:8000/stockInfo/MI_INDEX20
        let params:paramsIF = {
            type:"MI_INDEX20",
            router:"stockInfo/",
            data:{}
        }
        return api("GET", params, JSON.stringify(params.data))
    }

    static async get_StockAllDay<TResponse>():Promise<TResponse>{
        // url = http://localhost:8000/stockInfo/STOCK_DAY_ALL
        let params:paramsIF = {
            type:"STOCK_DAY_ALL",
            router:"stockInfo/",
            data:{}
        }
        return api("GET", params, JSON.stringify(params.data))
    }
    static async get_monthlyRevenue<TResponse>():Promise<TResponse>{
        // url = http://localhost:8000/governance/monthlyRevenue
        let params:paramsIF = {
            type:"monthlyRevenue",
            router:"governance/",
            data:{}
        }
        return api("GET", params, JSON.stringify(params.data))
    }
    static async get_balenceSheet<TResponse>():Promise<TResponse>{
        // url = http://localhost:8000/governance/balenceSheet
        let params:paramsIF = {
            type:"balenceSheet_normal",
            router:"governance/",
            data:{}
        }
        return api("GET", params, JSON.stringify(params.data))
    }
    static async get_balenceSheet_abnormal<TResponse>():Promise<TResponse>{
        // url = http://localhost:8000/governance/balenceSheet_abnormal
        let params:paramsIF = {
            type:"balenceSheet_abnormal",
            router:"governance/",
            data:{}
        }
        return api("GET", params, JSON.stringify(params.data))
    }
    static async get_balenceSheet_financial<TResponse>():Promise<TResponse>{
        // url = http://localhost:8000/governance/balenceSheet_financial
        let params:paramsIF = {
            type:"balenceSheet_financial",
            router:"governance/",
            data:{}
        }
        return api("GET", params, JSON.stringify(params.data))
    }
    static async get_balenceSheet_securities<TResponse>():Promise<TResponse>{
        // url = http://localhost:8000/governance/balenceSheet_securities
        let params:paramsIF = {
            type:"balenceSheet_securities",
            router:"governance/",
            data:{}
        }
        return api("GET", params, JSON.stringify(params.data))
    }
    static async get_balenceSheet_ins<TResponse>():Promise<TResponse>{
        // url = http://localhost:8000/governance/balenceSheet_insurance
        let params:paramsIF = {
            type:"balenceSheet_insurance",
            router:"governance/",
            data:{}
        }
        return api("GET", params, JSON.stringify(params.data))
    }

    // static async post_order<TResponse>(ORDER:PostOrder):Promise<TResponse>{
    //     // url = http://localhost:8000/create_order?id=1&fromtime=123&totime=123
    //     let params = {
    //         type:"create_order",
    //         data:ORDER
    //     }
    //     let _url = `${GLOBAL_VAR.API_HOST}/${params.type}`
    //     return api("POST", params.type, JSON.stringify(params.data))
    // }
}