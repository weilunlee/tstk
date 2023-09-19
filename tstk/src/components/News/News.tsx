import { useState } from "react"
import { useEffect } from "react"
import APIs from "../../actions/APIs"
import { LayoutProps } from "../../interfaces/IfProps"
import { news_fromFetch } from "../../interfaces/IfAPI"
import './_news.scss'

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
        let getNewsApi = new APIs("http://127.0.0.1:8000/TSTK/news").GET()
        getNewsApi.then(res=>{ 
            // res.splice(20); 
            let _a = res.filter((_r:news_fromFetch)=>{return _r.符合條款===newsSelc})
            console.log(_a)
            setNewsList(_a) 
        })
    },[newsSelc])
    function trans_String_to_Date(_str:string):string{
        return _str.slice(0,3)+"-"+_str.slice(3,5)+"-"+_str.slice(-2)
    }

    return(
    <div className="MainContainer">
        <div className="fx-d-c f-sec h-5 fx-ncfs cp font-Thin" 
            onClick={()=>{setNavSelc(_previousPage)}}> {"<"} {lastSelc[1]}</div>
        <div className="fx-d-c fx-ncfs font-xl font-Boldest">News !</div>
        
        <div className="w-100 h-8 fx-d-r fx-fsc">
            {newsTitle.map(res=><div 
                key={res[0]}
                className={`news-selector marg-r-3 ${newsSelc===res[1]?"_active":null}`} 
                onClick={()=>{setNewsSelc(res[1])}}>{console.log(res[1], newsSelc, newsSelc===res[1])}{res[0]}</div>)}
        </div>
        <div className="w-80 h-80 ovy-a pad-l-2px fx-d-r fxw-w marg-t-1 pos-a z-1">
        {newsList.map((res, index)=><div className="news-frame bx-shdw marg-r-3 marg-b-3 br-10" key={index}>
            <div className="news-header">
                <div className="fx-d-r fx-fsc pad-l-10px pad-r-20px">{trans_String_to_Date(res.發言日期)}</div>
                <div className="fx-d-r fx-fsc font-l font-Bold marg-t-3 pad-l-10px pad-r-20px">{res.公司代號} {res.公司名稱}</div>
                <div className="fx-d-r fx-fsc marg-t-3 pad-l-10px pad-r-20px text-l">{res["主旨 "]}</div>
            </div>
            <div className="news-body pos-r fx-d-c fx-fsc">
                <div className="w-90 fx-d-r fx-fsc h-20">{res.符合條款}</div>
                <div className="w-90 fx-d-r fx-ncfs h-80">{res.說明}</div>
                <div className="pos-a z-1 t-0 l-0 w-100 h-100 news-hidden-mask"></div>
            </div>
        </div>)}    
        </div>
    </div>
    )
}
export default News