export class ApiError extends Error{
    status:number
    statusText:string

    constructor(url:string, status:number, statusText:string) {
        super(`Request fail with ${status} on ${url}`);
        if(Error.captureStackTrace){
            Error.captureStackTrace(this, ApiError)
        }

        this.name = 'ApiError'
        this.status = status
        this.statusText = statusText
    }

}