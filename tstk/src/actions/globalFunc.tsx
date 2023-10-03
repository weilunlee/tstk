class GLOBAL_FUNC{
    static abbreviate(str:string='', length:number=5):JSX.Element{
        if(length===0){return <></>}
        if(str.length>length){
            return <div className='abbri' title={str}>{str.substring(0,length)}...</div>
        }
        else{return <div>{str}</div>}
    }
    static month(str:string):string{
        return "8月"
    }
    static abbreviateNumber(str:string=""):string{
        let _len = str.length
        if(_len<=5) return str.substring(0, str.length - 0)+""
        else if(_len<=9) return str.substring(0, str.length -4)+"萬"
        else return str.substring(0, str.length - 8)+"億"
        // else return str.substring(0, str.length - 4)+"兆"
    }
}

export default GLOBAL_FUNC;