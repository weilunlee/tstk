import { ReactNode } from "react"
import COMM_ATTR from "../styles/commAttrs"

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
    static abbreviateNumber(str:string="", type:string=""):JSX.Element{
        let _flag:string = ""
        let _onlyNumber:string = str
        if(str[0]==="-"){
            _flag="-"
            _onlyNumber = str.substring(1)
        }
        let _len:number = _onlyNumber.length
        if(str==="") return <ShowOrign content={str} type={type}>0</ShowOrign>
        else if(_len<=5) return <ShowOrign content={str} type={type}>{_flag}{_onlyNumber.substring(0, _onlyNumber.length - 0)}</ShowOrign>
        else if(_len<=8) return <ShowOrign content={str} type={type}>{_flag}{_onlyNumber.substring(0, _onlyNumber.length -4)}萬</ShowOrign>
        else if(_len<=12) return <ShowOrign content={str} type={type}>{_flag}{_onlyNumber.substring(0, _onlyNumber.length - 8)}億</ShowOrign>
        else return <ShowOrign content={str} type={type}>{_flag}{str.substring(0, str.length - 12)}.{_onlyNumber.substring(0, _onlyNumber.length - 11)}兆</ShowOrign>
    }
    static fractial(Numerator:string, denominator:string, fixed:number):string{
        let _re = (parseInt(Numerator)*100/parseInt(denominator)).toFixed(fixed)
        return _re.toString()+"%"
    }
}
interface showProps{
    children:ReactNode,
    content: string | number,
    type:string
}
const ShowOrign=({children, content, type}:showProps):JSX.Element=>{
    if (typeof content === "string") content = (parseInt(content)*1000).toLocaleString("en-US")
    return <div 
        data-tooltip={type+" "+content}
        aria-disabled="true"
        className={COMM_ATTR.tip}>
        {children}
    </div>
}

export interface SelcBoxIF{
    content:string,
    func:(val:string)=>void
    selected:string
}
export const SelcBox=({content, func, selected}:SelcBoxIF):JSX.Element=>{
    let _slc = selected===content
    return <div className={`flex flex-row items-center ml-2 px-2 cursor-pointer hover:bg-slate-100 rounded-lg ${_slc? "bg-slate-100":""}`} onClick={()=>{func(content)}}>
        <div className={`${_slc?"bg-black":""} w-2 h-2 border border-black mr-1`}></div>
        <div>{content}</div>
    </div>
}

export default GLOBAL_FUNC;

export class Date4Stock{
    date:Date
    day:string
    
    constructor(_d?:string){
        this.date = _d?new Date(_d):new Date()
        this.day = this.dayHandler()
    }

    dayHandler():string{
        let _day:number = this.date.getDay()
        let _time:number = this.date.getHours()
        switch (_day) {
            case 0:
                return `${this.date.getMonth()+1}/${this.date.getDate()-2}`
            case 6:
                return `${this.date.getMonth()+1}/${this.date.getDate()-1}`
            default:
                if(_time<15) return `${this.date.getMonth()+1}/${this.date.getDate()-1}`
                else return `${this.date.getMonth()+1}/${this.date.getDate()}`
        }
    }
}