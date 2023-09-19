import { useEffect, useState } from "react"
import APIs from "../../actions/APIs"
import { LayoutProps } from "../../interfaces/IfProps"
import { EPS_fromFetch } from "../../interfaces/IfAPI"


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
        let getEPS = new APIs("http://127.0.0.1:8000/TSTK/EPS").GET()
        getEPS.then(res=>{
            console.log(res)
            setEPS_row(res)
        })
        .catch(err=>{console.log(err)})
    }, [])

    function trans_String_to_Date(_str:string):string{
        return _str.slice(0,3)+"-"+_str.slice(3,5)+"-"+_str.slice(-2)
    }

    return(
    <div className="MainContainer">
        <div className="fx-d-c f-sec h-5 fx-ncfs cp font-Thin" 
            onClick={()=>{setNavSelc(_previousPage)}}> {"<"} {lastSelc[1]}</div>
        <div className="font-xl font-Boldest">EPS table</div>

        <div className="row-container bx-shdw h-70 w-100 pad-b-10px">
        <div className="w-25 h-10 fx-d-r font-l font-Bold fx-fsc pad-l-5pt">New Listing Company</div>
        <div className="w-100 h-10 fx-d-r">
            {_listingTitle.map((res, index)=><div className={`fx-ccc h-100 ${index!==1?"w-15":"w-25"}`}key={res}>{res}</div>)}
        </div>
        <div className="w-100 h-80 ovy-a pad-l-2px">
        {EPS_row.map(res=><div className="fx-d-r w-100 row" key={res.公司代號}>
            <div className="w-15">{res.公司代號}</div>
            <div className="w-25">{res.公司名稱}</div>
            <div className="w-15">{res.產業別}</div>
            <div className="w-15">{res["基本每股盈餘(元)"]}</div>
            <div className="w-15">{res.普通股每股面額}</div>
            <div className="w-15">{trans_String_to_Date(res.出表日期)}</div>
        </div>)}
        </div>
        </div>


    </div>
    )
}
export default EPSs