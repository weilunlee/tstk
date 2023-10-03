import { useEffect, useState } from "react"
import ApiSets from "../../actions/APIs/apiSets"
import { LayoutProps } from "../../interfaces/IfProps"
import { blcSheetIF } from "../../actions/APIs/apiInterface"
import GLOBAL_FUNC from "../../actions/globalFunc"
import { type } from "os"

const BalenceSheet = ({setNavSelc, lastSelc}:LayoutProps):JSX.Element=>{
    const [blcSheetRow, setBlcSheetRow] = useState<blcSheetIF[]>();

    useEffect(()=>{
        ApiSets.get_balenceSheet<blcSheetIF[]>()
        .then(res=>{
            ApiSets.get_balenceSheet_financial<blcSheetIF[]>()
            .then(res1=>{
                let highest = [...res, ...res1].sort((a, b) => parseFloat(b.資產總額) - parseFloat(a.資產總額))
                setBlcSheetRow(highest)
            })
        })
        .catch(err=>{console.log(err)})
    }, [])
    return <div className="MainContainer">
        <div className="bg-white rounded-xl shadow col-span-1">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row">
                    <div className="text-2xl font-extrabold pl-4 tracking-wider mr-2">資 產 負 債 表 </div>
                    <div>{blcSheetRow && GLOBAL_FUNC.month(blcSheetRow[0].季別)}</div>
                    <div>{blcSheetRow && blcSheetRow.length}</div>
                </div>
            </div>
            <div className="flex flex-row">
                <div className="w-40">code</div>
                <div className="flex justify-end w-28 text-l font-bold">A S S E T S</div>
                <div className="flex justify-end w-28 text-l font-bold ml-10">L I A B I L I T Y</div>
                <div className="flex justify-end w-28 text-l font-bold ml-10">E Q U I T Y</div>

                {/* <div className="w-40 flex justify-center">上月比較</div> */}
                {/* <div className="w-40 flex justify-center">去年比較</div> */}
            </div>
            <div>
                {blcSheetRow?.map(res=><CompanyRow {...res} key={res.公司代號}/>)}
            </div>
        </div>
    </div>
}

export default BalenceSheet

const CompanyRow=(props:blcSheetIF):JSX.Element=>{
    return <div className="flex flex-row">
        <div className="w-40 flex flex-row">
            <div className="text-xs mr-4">{props.公司代號}</div>
            <div className="flex items-center">{props.公司名稱}</div>
        </div>
        <div className="flex justify-end w-28">{GLOBAL_FUNC.abbreviateNumber(props.資產總額)}</div>{/* (仟元 * 1000) */}
        <div className="flex justify-end w-28 ml-10 pr-4">{GLOBAL_FUNC.abbreviateNumber(props.負債總額)}</div>{/* (仟元 * 1000) */}
        <div className="flex justify-end w-28 ml-10 pr-1">{GLOBAL_FUNC.abbreviateNumber(props.權益總額)}</div>
        <div className="flex justify-end w-28 ml-10 pr-1">{GLOBAL_FUNC.abbreviateNumber(props.保留盈餘)}</div>
        <div className="flex justify-end w-28">{GLOBAL_FUNC.abbreviateNumber(props.資本公積)}</div>
    </div>
}