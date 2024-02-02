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

    static async get_BWIBBU<TResponse>():Promise<TResponse>{
        // url = http://localhost:8000/stockInfo/BWIBBU_ALL
        let params:paramsIF = {
            type:"BWIBBU_ALL",
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
        // url = http://localhost:8000/balenceSheet/balenceSheet
        let params:paramsIF = {
            type:"balenceSheet_normal",
            router:"balenceSheet/",
            data:{}
        }
        return api("GET", params, JSON.stringify(params.data))
    }
    static async get_balenceSheet_abnormal<TResponse>():Promise<TResponse>{
        // url = http://localhost:8000/balenceSheet/balenceSheet_abnormal
        let params:paramsIF = {
            type:"balenceSheet_abnormal",
            router:"balenceSheet/",
            data:{}
        }
        return api("GET", params, JSON.stringify(params.data))
    }
    static async get_balenceSheet_financial<TResponse>():Promise<TResponse>{
        // url = http://localhost:8000/balenceSheet/balenceSheet_financial
        let params:paramsIF = {
            type:"balenceSheet_financial",
            router:"balenceSheet/",
            data:{}
        }
        return api("GET", params, JSON.stringify(params.data))
    }
    static async get_balenceSheet_securities<TResponse>():Promise<TResponse>{
        // url = http://localhost:8000/balenceSheet/balenceSheet_securities
        let params:paramsIF = {
            type:"balenceSheet_securities",
            router:"balenceSheet/",
            data:{}
        }
        return api("GET", params, JSON.stringify(params.data))
    }
    static async get_balenceSheet_ins<TResponse>():Promise<TResponse>{
        // url = http://localhost:8000/balenceSheet/balenceSheet_insurance
        let params:paramsIF = {
            type:"balenceSheet_insurance",
            router:"balenceSheet/",
            data:{}
        }
        return api("GET", params, JSON.stringify(params.data))
    }

    static async get_incomeStatement<TResponse>():Promise<TResponse>{
        // url = http://localhost:8000/incomeStatement/incomeStatement
        let params:paramsIF = {
            type:"incomeStatement_normal",
            router:"incomeStatement/",
            data:{}
        }
        return api("GET", params, JSON.stringify(params.data))
    }
    static async get_incomeStatement_abnormal<TResponse>():Promise<TResponse>{
        // url = http://localhost:8000/incomeStatement/incomeStatement_abnormal
        let params:paramsIF = {
            type:"incomeStatement_abnormal",
            router:"incomeStatement/",
            data:{}
        }
        return api("GET", params, JSON.stringify(params.data))
    }
    static async get_incomeStatement_financial<TResponse>():Promise<TResponse>{
        // url = http://localhost:8000/incomeStatement/incomeStatement_financial
        let params:paramsIF = {
            type:"incomeStatement_financial",
            router:"incomeStatement/",
            data:{}
        }
        return api("GET", params, JSON.stringify(params.data))
    }
    static async get_incomeStatement_securities<TResponse>():Promise<TResponse>{
        // url = http://localhost:8000/incomeStatement/incomeStatement_securities
        let params:paramsIF = {
            type:"incomeStatement_securities",
            router:"incomeStatement/",
            data:{}
        }
        return api("GET", params, JSON.stringify(params.data))
    }
    static async get_incomeStatement_ins<TResponse>():Promise<TResponse>{
        // url = http://localhost:8000/incomeStatement/incomeStatement_insurance
        let params:paramsIF = {
            type:"incomeStatement_insurance",
            router:"incomeStatement/",
            data:{}
        }
        return api("GET", params, JSON.stringify(params.data))
    }
    static async get_NEWS<TResponse>():Promise<TResponse>{
        // url = http://localhost:8000/incomeStatement/incomeStatement_insurance
        let params:paramsIF = {
            type:"news",
            router:"news/",
            data:{}
        }
        return api("GET", params, JSON.stringify(params.data))
    }
    static async get_EPS<TResponse>():Promise<TResponse>{
        // url = http://localhost:8000/stockInfo/EPS
        let params:paramsIF = {
            type:"EPS",
            router:"stockInfo/",
            data:{}
        }
        return api("GET", params, JSON.stringify(params.data))
    }
    static async get_Revenue<TResponse>():Promise<TResponse>{
        // url = http://localhost:8000/governance/monthlyRevenue
        let params:paramsIF = {
            type:"monthlyRevenue",
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