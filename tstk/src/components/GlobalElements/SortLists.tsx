import { SelcBox } from "../../actions/globalFunc"
import { Switcher } from "../Dashboard/IndexRow"

interface SortListIF{
    restoreHandle:(val:string)=>void,
    restoreType:string,
    switcher:number,
    handleSwitcher:Function,
    contentArr:string[]
}

function SortList({restoreHandle, restoreType, switcher, handleSwitcher, contentArr}:SortListIF):JSX.Element{
    return <div className="flex flex-row">
        {contentArr.map(res=><SelcBox key={res} content={res} func={restoreHandle} selected={restoreType}/>)}
        <div className="w-16 mr-4 flex flex-row justify-around">
            <Switcher switcher={switcher} func={handleSwitcher} tag={1} />
            <Switcher switcher={switcher} func={handleSwitcher} tag={2} />            
        </div>
    </div>    
}

export default SortList