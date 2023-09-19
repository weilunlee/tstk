import axios from "axios";

export default class APIs{
    private url:string 
    private parameters:object
    private data:object
    private result:object
    
    constructor(_url:string, _data:object={}, _parameters:object={}) {
        this.url = _url;
        this.data = _data;
        this.parameters = _parameters
        this.result = {}

    }
    
    public GET():Promise<any>{
        return (
            axios(this.url)
            .then(res=>{
                console.log(res)
                if(res.status===200||res.status===201||res.status===202||res.status===204){
                    return res.data 
                }
                else{return {...res, "error":"success but not 200, 201, 202 or 204"} }
            })
            .catch(err=>{ return {...err, "error":"fetch failed"} })
        )
    }
    public POST():object{
        axios(this.url)
        .then(res=>{
            if(res.status===200||res.status===201||res.status===202||res.status===204){this.result = res.data}
            else{this.result = {...res, "error":"success but not 200, 201, 202 or 204"}}
        })
        .catch(err=>{
            this.result = {...err, "error":"fetch failed"}
        })
        return this.result
    }
    public PUT():object{
        axios(this.url)
        .then(res=>{
            if(res.status===200||res.status===201||res.status===202||res.status===204){this.result = res.data}
            else{this.result = {...res, "error":"success but not 200, 201, 202 or 204"}}
        })
        .catch(err=>{
            this.result = err
        })
        return this.result
    }
    public DELETE():object{
        axios(this.url)
        .then(res=>{
            if(res.status===200||res.status===201||res.status===202||res.status===204){this.result = res.data}
            else{this.result = {...res, "error":"success but not 200, 201, 202 or 204"}}
        })
        .catch(err=>{
            this.result = err
        })
        return this.result
    }
}
