import { ApiError } from "./error";

const requestHeaders: HeadersInit = new Headers();
requestHeaders.set('Content-Type', 'application/json');
// const URL:string = "127.0.0.1"
// const header = {'content-type': 'application/json'}

async function api<TResponse>(url:string, method:string, type:string, data?:BodyInit):Promise<TResponse>{
    function handleApi(_u:string, _m:string, _h:HeadersInit, _d?:BodyInit):Promise<Response>{
        switch (method) {
            case "GET": return fetch(_u,{ method:_m, headers:_h })
            case "POST": return fetch(_u,{ method:_m, headers:_h, body:data })
            case "UPDATE": return fetch(_u,{ method:_m, headers:_h, body:data })
            case "DELETE": return fetch(_u,{ method:_m, headers:_h })
            default: return fetch(_u,{ method:_m, headers:_h })
        }
    }
    return handleApi(url, method, requestHeaders, data)
        .then((response) =>{
            if(response.status===200 || response.status===201 || response.status===202 || response.status===203 || response.status===204){
                return response.json()
            }
            else{
                throw new ApiError(url, response.status, response.statusText)
            }
        })
        .then((data) => data as TResponse);
}
export default api

