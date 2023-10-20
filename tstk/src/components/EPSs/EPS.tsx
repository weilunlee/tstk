import { useEffect, useState } from "react"
// import APIs from "../../actions/APIs"
import { LayoutProps } from "../../interfaces/IfProps"
import { EPS_fromFetch } from "../../interfaces/IfAPI"
import { nameHandle } from "../Dashboard/Stocks"
import ApiSets from "../../actions/APIs/apiSets"


const EPSs: React.FC<LayoutProps>=({setNavSelc, lastSelc})=>{
    let _previousPage:number = lastSelc[0]
    const [EPS_row, setEPS_row] = useState<EPS_fromFetch[]>([])

    let _listingTitle:Array<string> = [
        "公司代號",
        "公司名稱",
        "產業別",
        "基本每股盈餘(元)",
        "普通股每股面額",
        "出表日期" 
    ]

    useEffect(()=>{
        ApiSets.get_EPS<EPS_fromFetch[]>()
        .then(res=>{setEPS_row(res)})
        .catch(err=>{console.log(err)})
    }, [])

    function trans_String_to_Date(_str:string):string{
        return _str.slice(0,3)+"-"+_str.slice(3,5)+"-"+_str.slice(-2)
    }

    return(
    <div className="MainContainer">
        <div className="cursor-pointer font-light text-white" 
            onClick={()=>{setNavSelc(_previousPage)}}> {"<"} {lastSelc[1]}</div>
        <div className="text-3xl tracking-wider font-extrabold text-white">EPS table</div>

        <div className="bg-white rounded-lg shadow bx-shdw h-70 w-100 pad-b-10px">
            <div className="text-2xl font-bold">Earning Per Share</div>
            <div className="flex flex-row">
                {_listingTitle.map((res, index)=><div className={`flex justify-center ${index!==1?"w-44":"w-60"}`}key={res}>{res}</div>)}
            </div>
            <div className="scrollbar overflow-auto">
            {EPS_row.map(res=><div className="flex flex-row w-100 row" key={res.公司代號}>
                <div className="flex justify-center w-44">{res.公司代號}</div>
                <div className="flex justify-center w-60">{nameHandle(res.公司名稱)}</div>
                <div className="flex justify-center w-44">{res.產業別}</div>
                <div className="flex justify-center w-44">{res["基本每股盈餘(元)"]}</div>
                <div className="flex justify-center w-44">{res.普通股每股面額}</div>
                <div className="flex justify-center w-44">{trans_String_to_Date(res.出表日期)}</div>
            </div>)}
            </div>
        </div>
    </div>
    )
}
export default EPSs