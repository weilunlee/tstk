import GLOBAL_FUNC from "../../actions/globalFunc"
import { RevenueIF } from "../../interfaces/IfAPI"
import { UDIndex } from "../Dashboard/IndexRow"
import { Stock_all_day } from "../Dashboard/InterFaceDash"

interface IndiviRevenueIF { stock:Stock_all_day, RevenueInfo:RevenueIF}

function Revenue({stock, RevenueInfo}:IndiviRevenueIF):JSX.Element{
    console.log(RevenueInfo["累計營業收入-前期比較增減(%)"])
    return  <>
    {RevenueInfo?<div className="w-96 bg-white rounded-xl p-2 col-span-1">
        <div className="col-span-2 font-bold my-2 mx-5"></div>
        <div className="grid grid-cols-2 items-start">
            <div className="flex flex-col items-center">
                <div>月</div>
                <div className="flex w-full justify-between px-3">
                    <div>當月</div>
                    {GLOBAL_FUNC.abbreviateNumber(RevenueInfo["營業收入-當月營收"], "流動資產")}
                    ( {GLOBAL_FUNC.abbreviateNumber(RevenueInfo["營業收入-去年當月營收"], "非流動資產")} )
                </div>
                <div className="flex w-full justify-between px-3">
                    <div>上月</div>
                    {GLOBAL_FUNC.abbreviateNumber(RevenueInfo["營業收入-上月營收"], "流動資產")}
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div>累計</div>
                <div className="flex w-full justify-between px-3">
                    {GLOBAL_FUNC.abbreviateNumber(RevenueInfo["累計營業收入-當月累計營收"], "流動資產")}
                    {UDIndex("-", GLOBAL_FUNC.subNumber(RevenueInfo["累計營業收入-前期比較增減(%)"], 2))}
                </div>
                <div className="flex w-full justify-between px-3">
                    <div>前期</div>
                    {GLOBAL_FUNC.abbreviateNumber(RevenueInfo["累計營業收入-去年累計營收"], "流動資產")}
                </div>
            </div>
        </div>
    </div>:null}
    </>
}

export default Revenue