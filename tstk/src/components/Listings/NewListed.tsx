import { useState } from "react"
import { useEffect } from "react"
import APIs from "../../actions/APIs"
import { newListing_fromFetch } from "../../interfaces/IfAPI"
import {OnOff_switch} from "../../interfaces/IfProps"
import GLOBAL_VAR from "../../assests/globalAttr/globalVar"

const NewListed: React.FC<OnOff_switch>=({onBool, toggleOn})=>{

    const [listingResult, setListingResult] = useState<newListing_fromFetch[]>([])
    let _listingTitle:Array<string> = [
        "代號",
        "名稱",
        "承銷價",
        "董監事",
        "資本額",
        "承銷商",
        "申請日期",
        "通過上市日期",
        "上市日期",
        "備註" 
    ]
    useEffect(()=>{
        let getListApi:Promise<newListing_fromFetch[]> = new APIs(GLOBAL_VAR.HOST + "newListing").GET()
        getListApi.then(res=>{
            res.splice(100)
            setListingResult(res)
            console.log(res)
        })
        .catch(err=>{console.log(err)})
    },[])
    function trans_String_to_Date(_str:string):string{
        return _str.slice(0,3)+"-"+_str.slice(3,5)+"-"+_str.slice(-2)
    }
    function trans_CapitalAmount(_str:string):string{
        let _amount:number = Math.floor(parseInt(_str)/100)
        return `${_amount}`
    }

    return(
    <>
        {/* --- listing container --- */}
        <div className="bg-white rounded-lg shadow">
        <div className="text-2xl font-bold">New Listing Company</div>
        <div className="flex flex-row">
            {_listingTitle.map((res, index)=><div className={`${index===0?"pl-5":''} h-100 ${index!==9?"w-28":"w-60"}`}key={res}>{res}</div>)}
        </div>
        <div className="w-100 h-80 scrollbar overflow-auto pad-l-2px">
        {listingResult.map(res=><div className="flex flex-row w-100 hover:bg-pink-200" key={res.Company}>
            <div className="pl-5 w-28">{res.Code}</div>
            <div className="w-28">{res.Company}</div>
            <div className="w-28">{res.UnderwritingPrice}</div>
            <div className="w-28">{res.Chairman}</div>
            <div className="w-28">{trans_CapitalAmount(res["AmountofCapital "])}萬</div>
            <div className="w-28">{res.Underwriter}</div>
            <div className="w-28">{trans_String_to_Date(res.ApplicationDate)}</div>
            <div className="w-28">{trans_String_to_Date(res.ApprovedDate)}</div>
            <div className="w-28">{trans_String_to_Date(res.ApprovedListingDate)}</div>
            <div className="w-60">{res.Note}</div>
        </div>)}
        </div>
        </div>
        {/* --- listing container --- */}

    </>
    )
}
export default NewListed