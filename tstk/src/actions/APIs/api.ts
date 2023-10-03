import GLOBAL_VAR from "../../assests/globalAttr/globalVar";
import { ApiError } from "./error";

const requestHeaders: HeadersInit = new Headers();
requestHeaders.set('Content-Type', 'application/json');
// const URL:string = "127.0.0.1"
// const header = {'content-type': 'application/json'}

export interface paramsIF{
    router:string,
    type:string,
    data:object
}


async function api<TResponse>(method:string, params:paramsIF, data?:BodyInit):Promise<TResponse>{
    const _URL = `${GLOBAL_VAR.HOST + params.router + params.type}`
    function handleApi(_u:string, _m:string, _h:HeadersInit, _d?:BodyInit):Promise<Response>{
        switch (method) {
            case "GET": return fetch(_u,{ method:_m, headers:_h })
            case "POST": return fetch(_u,{ method:_m, headers:_h, body:data })
            case "UPDATE": return fetch(_u,{ method:_m, headers:_h, body:data })
            case "DELETE": return fetch(_u,{ method:_m, headers:_h })
            default: return fetch(_u,{ method:_m, headers:_h })
        }
    }
    return handleApi(_URL, method, requestHeaders, data)
        .then((response) =>{
            if(response.status===200 || response.status===201 || response.status===202 || response.status===203 || response.status===204){
                return response.json()
            }
            else{
                throw new ApiError(_URL, response.status, response.statusText)
            }
        })
        .then((data) => data as TResponse);
}
export default api

