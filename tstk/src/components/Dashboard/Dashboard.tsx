import GLOBAL_FUNC from "../../actions/globalFunc";
import { MAIN_INDEX } from "./InterFaceDash";
import { AllStockIF } from "./DashFrame";

const Dashboard = ({allStock, desc, asc}:AllStockIF):JSX.Element=>{
    let descRow = desc.slice(0,5)
    let ascRow = asc.slice(0,5)
    let _0050 = allStock.filter(res=>res.指數==="臺灣50指數")[0]
    let _noBank = allStock.filter(res=>res.指數==="未含金融指數")[0]

    return <div className="col-span-1">
        <div className="flex flow-row">
            <div className="bg-white shadow rounded-xl w-32 h-20 flex flex-col justify-center items-center mr-2">
                <div className={`text-2xl font-extrabold tracking-widest ${allStock[1]?.漲跌==='+'?"text-pink-500":"text-green-500"}`}>{allStock[1]?.收盤指數}</div>
                <div>今日大盤指數</div>
            </div>
            <div className="bg-white shadow rounded-xl w-32 h-20 flex flex-col justify-center items-center mr-2">
                <div className={`text-2xl font-extrabold tracking-widest ${_0050?.漲跌==='+'?"text-pink-500":"text-green-500"}`}>{_0050?.收盤指數}</div>
                <div>0050</div>
            </div>
            <div className="bg-white shadow rounded-xl w-32 h-20 flex flex-col justify-center items-center mr-2">
                <div className={`text-2xl font-extrabold tracking-widest ${_noBank?.漲跌==='+'?"text-pink-500":"text-green-500"}`}>{_noBank?.收盤指數}</div>
                <div>未含金融指數</div>
            </div>
        </div>
        <Top5Box row={descRow} color="pink"/>
        <Top5Box row={ascRow} color="green"/>
    </div>
}
export default Dashboard

function nameHandle(name:string|undefined):string{
    let _spliter = "指數"
    if (name?.includes(_spliter)) return name.split(_spliter)[0]
    else return name?"":""
}

function UDIndex(_ud:string, _index:string):JSX.Element{
    let _color = _ud==='+'? "bg-pink-200":"bg-green-200"
    return <div className="flex flex-row justify-around text-sm">
        <div className={_color + " rounded-full flex justify-center px-2 ml-5"}>{_index}%</div>
    </div>
}

interface T5BoxIF{ row:MAIN_INDEX[], color:string}

function Top5Box({row, color}:T5BoxIF):JSX.Element{
    return <div className={`mt-5 border-${color}-500 border-l-[30px] border-4 bg-white shadow rounded-xl w-[25rem] h-40 flex flex-col justify-around items-start`}>
        {row.map(res=><div className="w-full flex flex-row justify-between items-center hover:bg-slate-200" key={res.指數}>
            <div>{UDIndex(res.漲跌, res.漲跌百分比)}</div>
            <div className="w-40">{GLOBAL_FUNC.abbreviate(nameHandle(res.指數), 8)}</div>
            <div className="w-20">{res.收盤指數}</div>
        </div>)}
    </div>
}