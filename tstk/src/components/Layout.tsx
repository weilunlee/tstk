import { useState, useEffect } from "react";
import Dashboard from "./Dashboard/DashFrame";
import EPSs from "./EPSs/EPS";
import Listings from "./Listings/Listings";
import NavBar from "./navBar/NavBar";
import News from "./News/News";
import IndiviualStock from "./Dashboard/Indiviual";

const Layout: React.FC=()=>{
    const [navSelc, setNavSelc] = useState<number>(100)
    const [lastSelc, setLastSelc] = useState<[number, string]>([0, "Dashboard"])
    const [selcComponent, setSelcComponent] = useState<JSX.Element>(<Dashboard />)
    
    useEffect(()=>{
        switch (navSelc){
            case 100: setSelcComponent(<Dashboard />); break;
            case 99: setSelcComponent(<IndiviualStock />); break;
            case 0: setSelcComponent(<News setNavSelc={setNavSelc} lastSelc={lastSelc}/>); break;
            case 1: setSelcComponent(<EPSs setNavSelc={setNavSelc} lastSelc={lastSelc}/>); break;
            case 2: setSelcComponent(<Listings setNavSelc={setNavSelc} lastSelc={lastSelc}/>); break;
        }
    }, [navSelc, lastSelc])
    

    return(
        <div className="flex flex-row h-screen w-screen scrollbar overflow-x-hidden overflow-y-auto bg-beige">
            <NavBar navSelc={navSelc} setNavSelc={setNavSelc} setLastSelc={setLastSelc}/>
            {selcComponent}
        </div>
    )
}


export default Layout;