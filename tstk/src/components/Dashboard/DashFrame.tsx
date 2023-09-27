import { useEffect, useState } from "react";
import { MAIN_INDEX } from "./InterFaceDash";
import ApiSets from "../../actions/apiSets";
import IndexRow from "./IndexRow";
import Dashboard from "./Dashboard";
export interface AllStockIF{ allStock:MAIN_INDEX[], desc:MAIN_INDEX[], asc:MAIN_INDEX[] }

const DashFrame: React.FC=()=>{
    const [allStock, setAllStock] = useState<MAIN_INDEX[]>([]);
    const [desc, setDesc] = useState<MAIN_INDEX[]>([]);
    const [asc, setAsc] = useState<MAIN_INDEX[]>([]);

    useEffect(()=>{
        ApiSets.get_main_index<MAIN_INDEX[]>()
        .then(res=>{
            setAllStock(res)
            let highest = [...res].sort((a, b) => parseFloat(b.漲跌百分比) - parseFloat(a.漲跌百分比))
            let lowest = [...res].sort((a, b) => parseFloat(a.漲跌百分比) - parseFloat(b.漲跌百分比))
            setDesc(highest)
            setAsc(lowest)
        })
        .catch(err=>{console.log(err)})
    }, [])

    return(
    <div className="MainContainer grid grid-cols-2 gap-5">
        <IndexRow allStock={allStock} desc={desc} asc={asc}/>
        <Dashboard allStock={allStock} desc={desc} asc={asc}/>
    </div>
    )
}
export default DashFrame