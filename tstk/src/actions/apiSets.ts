import GLOBAL_VAR from "../assests/globalAttr/globalVar";
import api from "./api";

export default class ApiSets{
    static async get_main_index<TResponse>():Promise<TResponse>{
        // url = http://localhost:8000/MI_INDEX
        let params = {
            type:"MI_INDEX",
            data:{}
        }
        let _url = `${GLOBAL_VAR.HOST+params.type}`
        return api( _url, "GET", params.type, JSON.stringify(params.data))
    }

    static async get_MI20<TResponse>():Promise<TResponse>{
        // url = http://localhost:8000/MI_INDEX20
        let params = {
            type:"MI_INDEX20",
            data:{}
        }
        let _url = `${GLOBAL_VAR.HOST+params.type}`
        return api( _url, "GET", params.type, JSON.stringify(params.data))
    }

    static async get_StockAllDay<TResponse>():Promise<TResponse>{
        // url = http://localhost:8000/STOCK_DAY_ALL
        let params = {
            type:"STOCK_DAY_ALL",
            data:{}
        }
        let _url = `${GLOBAL_VAR.HOST+params.type}`
        return api( _url, "GET", params.type, JSON.stringify(params.data))
    }
    // static async post_order<TResponse>(ORDER:PostOrder):Promise<TResponse>{
    //     // url = http://localhost:8000/create_order?id=1&fromtime=123&totime=123
    //     let params = {
    //         type:"create_order",
    //         data:ORDER
    //     }
    //     let _url = `${GLOBAL_VAR.API_HOST}/${params.type}`
    //     return api( _url, "POST", params.type, JSON.stringify(params.data))
    // }
}