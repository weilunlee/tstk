import { useState } from "react"
import { useEffect } from "react"
// import APIs from "../../actions/APIs"
import { LayoutProps } from "../../interfaces/IfProps"
import { news_fromFetch } from "../../interfaces/IfAPI"
import GLOBAL_VAR from "../../assests/globalAttr/globalVar"
import GF from "../../actions/globalFunc"

const News: React.FC<LayoutProps>=({setNavSelc, lastSelc})=>{
    let _previousPage:number = lastSelc[0]
    const [newsList, setNewsList] = useState<news_fromFetch[]>([])
    const [newsSelc, setNewsSelc] = useState<string>("")

    const newsTitle:[string, string][] = [
        ["股利", "第14款"], 
        ["人事變動", "第8款"], 
        ["股東大會", "第17款"], 
        ["發布會", "第13款"], 
        ["重大訊息", "第31款"], 
        ["增減資", "第11款"],
        ["其他", "第51款"]
    ]

    useEffect(()=>{
        // let getNewsApi = new APIs(GLOBAL_VAR.HOST + "news").GET()
        // getNewsApi.then(res=>{ 
        //     let _a:news_fromFetch[]
        //     if(newsSelc==="") _a = res
        //     else _a = res.filter((_r:news_fromFetch)=>_r.符合條款===newsSelc)
        //     setNewsList(_a) 
        // })
        // .catch(err=>{console.log(err)})
    },[newsSelc])
    function trans_String_to_Date(_str:string):string{
        return _str.slice(0,3)+"-"+_str.slice(3,5)+"-"+_str.slice(-2)
    }
    return(
    <div className="MainContainer">
        <div className="cursor-pointer font-light" 
            onClick={()=>{setNavSelc(_previousPage)}}> {"<"} {lastSelc[1]}</div>
        <div className="flex flex-row cursor-pointer text-3xl tracking-wider text-xlato font-extrabold">News !</div>
        
        <div className="flex flex-row mb-2">
            {newsTitle.map(res=><div 
                key={res[0]}
                className={`border-blue_1 px-4 rounded-full border cursor-pointer mr-2 hover:bg-red-300 hover:border-red-400 ${newsSelc===res[1]?"bg-red-600 border-red-500 text-white":""}`} 
                onClick={()=>{setNewsSelc((newsSelc===res[1])?"":res[1])}}>{res[0]}</div>)}
        </div>
        <div className="w-100 h-100 overflow-y-auto flex flex-row flex-wrap">
        {newsList.map((res, index)=><div className="w-60 h-72 overflow-hidden mr-2 grid grid-rows-5 mb-2" key={index}>
            <div className="bg-blue_2 row-span-2 p-2">
                <div className="flex flex-row justify-between">
                    <div className="">{res.公司代號} {res.公司名稱}</div>
                    <div className="font-light text-sm">{trans_String_to_Date(res.發言日期)}</div>
                </div>
                {GF.abbreviate(res["主旨 "], 20)}
            </div>
            <div className="fx-d-c fx-fsc row-span-3 p-2 bg-white relative">
                <div className="">{res.符合條款}</div>
                <div className="">{res.說明}</div>
                <div className="absolute z-1 top-36 -m-2 w-full h-10 news-hidden-mask"></div>
            </div>
        </div>)}    
        </div>
    </div>
    )
}
export default News