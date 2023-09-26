import GLOBAL_FUNC from "../../actions/globalFunc";
import { AllStockIF } from "./DashFrame";

const Dashboard = ({allStock, desc, asc}:AllStockIF):JSX.Element=>{
    let descRow = desc.slice(0,5)
    let ascRow = asc.slice(0,5)
    return <div className="col-span-1">
        <div className="bg-white shadow rounded-xl w-44 h-32 flex flex-col justify-center items-center">
            <div className={`text-2xl font-extrabold tracking-widest ${allStock[1]?.漲跌==='+'?"text-pink-500":"text-green-500"}`}>{allStock[1]?.收盤指數}</div>
            <div>今日大盤指數</div>
        </div>
        <div className="mt-5 border-l-[30px] border-4 border-pink-300 bg-white shadow rounded-xl w-96 h-40 flex flex-col justify-around items-start">
            {descRow.map(res=><div className="w-full flex flex-row justify-between items-center hover:bg-slate-200">
                <div>{UDIndex(res.漲跌, res.漲跌百分比)}</div>
                <div className="w-40">{GLOBAL_FUNC.abbreviate(nameHandle(res.指數), 8)}</div>
                <div className="w-20">{res.收盤指數}</div>
            </div>)}
        </div>
        <div className="mt-5 border-l-[30px] border-4 border-green-300 bg-white shadow rounded-xl w-96 h-40 flex flex-col justify-around items-start">
            {ascRow.map(res=><div className="w-full flex flex-row justify-between items-center hover:bg-slate-200">
                <div>{UDIndex(res.漲跌, res.漲跌百分比)}</div>
                <div className="w-40">{GLOBAL_FUNC.abbreviate(nameHandle(res.指數), 8)}</div>
                <div className="w-20">{res.收盤指數}</div>
            </div>)}
        </div>
    </div>
}
export default Dashboard

function nameHandle(name:string|undefined):string{
    let _spliter = "指數"
    if (name?.includes(_spliter)) return name.split(_spliter)[0]
    else return name?"":""
}

export function UDIndex(_ud:string, _index:string):JSX.Element{
    let _color = _ud==='+'? "bg-pink-200":"bg-green-200"
    return <div className="flex flex-row justify-around text-sm">
        <div className={_color + " rounded-full flex justify-center px-2 ml-5"}>{_index}%</div>
    </div>
}
