import { useState } from "react"
import { useEffect } from "react"
// import APIs from "../../actions/APIs"
import { deListed_fromFetch } from "../../interfaces/IfAPI"
import {OnOff_switch} from "../../interfaces/IfProps"
import GLOBAL_VAR from "../../assests/globalAttr/globalVar"

const Delisted: React.FC<OnOff_switch>=({onBool, toggleOn})=>{
    const [listingResult, setListingResult] = useState<deListed_fromFetch[]>([])
    let _listingTitle:Array<string> = [
        "代號",
        "名稱",
        "下市日期"
    ]
    useEffect(()=>{
            // let getDelistApi:Promise<deListed_fromFetch[]> = new APIs(GLOBAL_VAR.HOST + "delisted").GET()
            // getDelistApi.then(res=>{
            //     res.splice(100)
            //     setListingResult(res)
            //     console.log(res)
            // })
    },[])
    function trans_String_to_Date(_str:string):string{
        return _str.slice(0,3)+"-"+_str.slice(3,5)+"-"+_str.slice(-2)
    }

    return(
    <>
        {/* --- listing container --- */}
        <div className="bg-white rounded-lg shadow">
        <div className="text-2xl font-bold">Delisted Company</div>
        <div className="flex flex-row">
            {_listingTitle.map((res, index)=><div className={`${index===0?"pl-5":""} h-100 ${index!==8?"w-28":"w-0"}`}key={res}>{res}</div>)}
        </div>
        <div className="w-100 h-72 scrollbar overflow-auto pad-l-2px">
        {listingResult.map(res=><div className="flex flex-row w-100 hover:bg-pink-200" key={res.Company}>
            <div className="pl-5 w-28">{res.Code}</div>
            <div className="w-28">{res.Company}</div>
            <div className="w-28">{trans_String_to_Date(res.DelistingDate)}</div>
        </div>)}
        </div>
        </div>
        {/* --- listing container --- */}

    </>
    )
}
export default Delisted