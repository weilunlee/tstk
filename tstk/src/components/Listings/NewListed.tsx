import { useState } from "react"
import { useEffect } from "react"
import APIs from "../../actions/APIs"
import { newListing_fromFetch } from "../../interfaces/IfAPI"
import {OnOff_switch} from "../../interfaces/IfProps"

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
            let getListApi:Promise<newListing_fromFetch[]> = new APIs("http://127.0.0.1:8000/TSTK/newListing").GET()
            getListApi.then(res=>{
                res.splice(100)
                setListingResult(res)
                console.log(res)
            })
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
        <div className="row-container bx-shdw h-70 w-100 pad-b-10px">
        <div className="w-25 h-10 fx-d-r font-l font-Bold fx-fsc pad-l-5pt">New Listing Company</div>
        <div className="w-100 h-10 fx-d-r">
            {_listingTitle.map((res, index)=><div className={`fx-ccc h-100 ${index!==8?"w-10":"w-20"}`}key={res}>{res}</div>)}
        </div>
        <div className="w-100 h-80 ovy-a pad-l-2px">
        {listingResult.map(res=><div className="fx-d-r w-100 row" key={res.Company}>
            <div className="w-10">{res.Code}</div>
            <div className="w-10">{res.Company}</div>
            <div className="w-10">{res.UnderwritingPrice}</div>
            <div className="w-10">{res.Chairman}</div>
            <div className="w-10">{trans_CapitalAmount(res["AmountofCapital "])}萬</div>
            <div className="w-10">{res.Underwriter}</div>
            <div className="w-10">{trans_String_to_Date(res.ApplicationDate)}</div>
            <div className="w-10">{trans_String_to_Date(res.ApprovedDate)}</div>
            <div className="w-10">{trans_String_to_Date(res.ApprovedListingDate)}</div>
            <div className="w-20">{res.Note}</div>
        </div>)}
        </div>
        </div>
        {/* --- listing container --- */}

    </>
    )
}
export default NewListed