class GLOBAL_FUNC{
    static abbreviate(str:string='', length:number=5):JSX.Element{
        if(length===0){return <></>}
        if(str.length>length){
            return <div className='abbri' title={str}>{str.substring(0,length)}...</div>
        }
        else{return <div>{str}</div>}
    }
}

export default GLOBAL_FUNC;