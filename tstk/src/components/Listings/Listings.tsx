import { useState } from "react"
import { LayoutProps } from "../../interfaces/IfProps"
import NewListed from "./NewListed"
import Delisted from "./Delisted"

const Listings: React.FC<LayoutProps>=({setNavSelc, lastSelc})=>{
    let _previousPage:number = lastSelc[0]
    const [listed_On, setListed_On] = useState<boolean>(false)
    function toggleListed():void{ setListed_On(!listed_On)}
    const [delisted_On, setDelisted_On] = useState<boolean>(false)
    function toggleDelisted():void{ setDelisted_On(!delisted_On)}

    return(
    <div className="MainContainer">
        <div className="fx-d-c f-sec h-5 fx-ncfs cp font-Thin"
            onClick={()=>{setNavSelc(_previousPage)}}> {"<"} {lastSelc[1]}</div>
        <div className="font-xl font-Boldest fx-d-c fx-ncfs">Listing Date</div>
        
        {/* --- listed container --- */}
        <div className="fx-d-r fx-fsc marg-t-1 font-l marg-b-1" onClick={toggleListed}>
            <div className="w-10 fx-d-r fx-fsc">New Listed</div>
            <div className=" create-row-plus"></div>
        </div>
        {listed_On? <NewListed onBool={listed_On} toggleOn={toggleListed} />:null}
        {/* --- listed container --- */}

        {/* --- listed container --- */}
        <div className="fx-d-r fx-fsc marg-t-1 font-l marg-b-1" onClick={toggleDelisted}>
            <div className="w-10 fx-d-r fx-fsc">Delisted</div>
            <div className=" create-row-plus"></div>
        </div>
        {delisted_On? <Delisted onBool={delisted_On} toggleOn={toggleDelisted} />:null}
        {/* --- listed container --- */}

    </div>
    )
}
export default Listings