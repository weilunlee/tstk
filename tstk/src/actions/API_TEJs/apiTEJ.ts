// import GLOBAL_VAR from "../../assests/globalAttr/globalVar"
// import api, { paramsIF } from "../APIs/api"

export default class TEJSets{
    _news:string = "/news/"
    _stockInfo:string = "/stockInfo/"
    _governance:string = "/governance/"

    // static async get_TEJ_Basic_Company<TResponse>():Promise<TResponse>{
    //     // 上市(櫃)基本資料
    //     // GET https://api.tej.com.tw/api/datatables/TWN/APRCD.json?api_key=<YOURAPIKEY>
    //     let params:paramsIF = {
    //         type:"?api_key=<"+GLOBAL_VAR.API_KEY_TEJ+">",
    //         router:"TRAIL/TAIM1A.json",
    //         data:{}
    //     }
    //     return api("GET", params, JSON.stringify(params.data), GLOBAL_VAR.HOST_TEJ)
    // }
}
