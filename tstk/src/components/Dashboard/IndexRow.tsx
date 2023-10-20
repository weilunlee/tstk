import { useState } from "react";
import GLOBAL_FUNC, { Date4Stock } from "../../actions/globalFunc";
import { AllStockIF } from "../Dashboard/DashFrame";
import { MAIN_INDEX } from "../Dashboard/InterFaceDash";

export  interface SwitcherIF{ switcher:number, func:Function, tag:number }

const IndexRow=({allStock, asc, desc}:AllStockIF):JSX.Element=>{
    const [switcher, setSwitcher] = useState<number>(0);
    function handleSwitcher(_tag:number):void{
        if(_tag===switcher) setSwitcher(0)
        else setSwitcher(_tag)
    }
    let Title:Array<string> = ["指數","收盤指數","漲跌"]

    return(
    <div className="bg-white rounded-xl shadow col-span-1">
        <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row">
                <div className="text-2xl font-extrabold pl-4 tracking-wider">TWSE 大 盤 指 數</div>
                <div>{allStock.length}</div>
                <div className="pl-5">{new Date4Stock().day}</div>
            </div>
            <div className="flex flex-row w-20 mr-5 justify-around">
                <Switcher switcher={switcher} func={handleSwitcher} tag={1} />
                <Switcher switcher={switcher} func={handleSwitcher} tag={2} />            
            </div>
        </div>
        <div className="flex flex-row">
            {Title.map((res, index)=><div className={`${index===0?"pl-10 w-80 border-l-8":'flex justify-center items-center w-32'} h-100`}key={index}>{res}</div>)}
        </div>
        <div className="scrollbar overflow-auto" style={{height:"calc(100vh - 7rem)"}}>
            {switcher===0?
                allStock.map((res, index)=><StockRow {...res} key={index}/>)
            :switcher===1?
                desc.map((res, index)=><StockRow {...res} key={index}/>)
            :
                asc.map((res, index)=><StockRow {...res} key={index}/>)
            }
        </div>
    </div>
    )
}
export default IndexRow

function StockRow(stock:MAIN_INDEX):JSX.Element{
    return  <div className={" mb-1 flex flex-row hover:bg-pink-200"} >
    <div className={UDsign(stock.漲跌, stock.漲跌百分比) + " pl-3 w-80 flex items-center"}>
        {UDtransfer(stock.漲跌, stock.漲跌百分比)}
        {GLOBAL_FUNC.abbreviate(nameHandle(stock.指數), 8)}
        {UDIndex(stock.漲跌, stock.漲跌百分比)}
        {stock.特殊處理註記!==""?
        <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
        </span>:null}
    </div>
    <div className="w-32 flex justify-center items-center">{stock.收盤指數}</div>
    <div className="w-32 flex justify-center items-center">{stock.漲跌點數}</div>      
</div>
}

export function Switcher({switcher, func, tag}:SwitcherIF):JSX.Element{
    let _color_bd = tag===1? "translate-y-px border-pink-700 border-r-2 border-t-2 ":"-translate-y-px border-green-700  border-b-2 border-r-2"
    let _rotate = tag===1? "-skew-y-[35deg]":"skew-y-[35deg]"
    let _color:string = tag===1?"pink":"green"
    return <div onClick={()=>{func(tag)}} className={`h-5 w-5 flex justify-center items-center rounded-md shadow cursor-pointer active:shadow-none ${switcher===tag?`bg-${_color}-300`:"bg-slate-200"}`}>
        <div className={_rotate}>
            <div className={`w-3 h-1 rounded-xs ${_color_bd} hover:border-${_color}-800 ${switcher===tag?`border-${_color}-800`:`border-${_color}-300`}`}></div>
        </div>
    </div>
}

export function UDsign(_ud:string, _index:string):string{
    return _ud==='+'? "border-pink-500 border-l-8":_ud==='-'?"border-green-500 border-l-8 ":"border-slate-400 border-l-8 "
}

export function UDtransfer(_ud:string, _index:string):JSX.Element{
    let _color_bd = _ud==='+'? "border-pink-700 border-r border-t":_ud==='-'?"border-green-700 border-b border-r":"border-slate-500 border-b"
    let _rotate = _ud==='+'? "-skew-y-[35deg]":_ud==='-'?"skew-y-[35deg]":""
    return <div className={_rotate + " flex justify-center items-center mr-2"}>
        <div className={_color_bd + " w-3 h-1 rounded-xs"}></div>
    </div>
}

export function UDIndex(_ud:string, _index:string):JSX.Element{
    let _color = _ud==='+'? "bg-pink-300":_ud==='-'?"bg-green-300":"bg-slate-300"
    return <div className="my-1 flex flex-row justify-around text-sm">
        <div className={_color + " rounded-full flex justify-center px-2 ml-5"}>{_index}%</div>
    </div>
}

function nameHandle(name:string|undefined):string{
    let _spliter = "指數"
    if (name?.includes(_spliter)) return name.split(_spliter)[0]
    else return name?"":""
}