import { useState } from "react"
import { useEffect } from "react"
import APIs from "../../actions/APIs"
import { deListed_fromFetch } from "../../interfaces/IfAPI"
import {OnOff_switch} from "../../interfaces/IfProps"

const Delisted: React.FC<OnOff_switch>=({onBool, toggleOn})=>{
    const [listingResult, setListingResult] = useState<deListed_fromFetch[]>([])
    let _listingTitle:Array<string> = [
        "代號",
        "名稱",
        "下市日期"
    ]
    useEffect(()=>{
            let getDelistApi:Promise<deListed_fromFetch[]> = new APIs('http://127.0.0.1:8000/TSTK/delisted').GET()
            getDelistApi.then(res=>{
                res.splice(100)
                setListingResult(res)
                console.log(res)
            })
    },[])
    function trans_String_to_Date(_str:string):string{
        return _str.slice(0,3)+"-"+_str.slice(3,5)+"-"+_str.slice(-2)
    }

    return(
    <>
        {/* --- listing container --- */}
        <div className="row-container bx-shdw h-70 w-100 pad-b-10px">
        <div className="w-25 h-10 fx-d-r font-l font-Bold fx-fsc pad-l-5px">Delisted Company</div>
        <div className="w-100 h-10 fx-d-r">
            {_listingTitle.map((res, index)=><div className={`fx-ccc h-100 ${index!==8?"w-10":"w-20"}`}key={res}>{res}</div>)}
        </div>
        <div className="w-100 h-80 ovy-a pad-l-2px">
        {listingResult.map(res=><div className="fx-d-r w-100 row" key={res.Company}>
            <div className="w-10">{res.Code}</div>
            <div className="w-10">{res.Company}</div>
            <div className="w-10">{trans_String_to_Date(res.DelistingDate)}</div>
        </div>)}
        </div>
        </div>
        {/* --- listing container --- */}

    </>
    )
}
export default Delisted