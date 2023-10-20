import { useState, useEffect } from "react";
import Dashboard from "./Dashboard/DashFrame";
import EPSs from "./EPSs/EPS";
import NavBar from "./navBar/NavBar";
import News from "./News/News";
// import MonthlyReport from "./Reports/monthlyReport";
import BalenceSheet from "./Reports/balenceSheet";
import IncomeStatement from "./Reports/incomeStatement";
import StockRows from "./Dashboard/Stocks";
import { useAppSelector } from "../stores/hooks";
import Individual from "./Stocks/Individual";
import FetchLayer from "./FetchLayer";

const Layout: React.FC=()=>{
    const [navSelc, setNavSelc] = useState<number>(100)
    const [lastSelc, setLastSelc] = useState<[number, string]>([0, "Dashboard"])
    const [selcComponent, setSelcComponent] = useState<JSX.Element>(<Dashboard />)
    const store_stock = useAppSelector(state=>state.stocks.stockSelc)

    useEffect(()=>{
        if(store_stock && store_stock.Code===""){
            switch (navSelc){
                case 0: setSelcComponent(<Dashboard />); break;
                case 1: setSelcComponent(<StockRows />); break;
                case 2: setSelcComponent(<News setNavSelc={setNavSelc} lastSelc={lastSelc}/>); break;
                case 3: setSelcComponent(<EPSs setNavSelc={setNavSelc} lastSelc={lastSelc}/>); break;
                case 4: setSelcComponent(<BalenceSheet setNavSelc={setNavSelc} lastSelc={lastSelc}/>); break;
                case 5: setSelcComponent(<IncomeStatement setNavSelc={setNavSelc} lastSelc={lastSelc}/>); break;
                // case 3: setSelcComponent(<MonthlyReport setNavSelc={setNavSelc} lastSelc={lastSelc}/>); break;
            }
        }
        else{
            setSelcComponent(<Individual setNavSelc={setNavSelc} lastSelc={lastSelc} stock={store_stock}/>)
        }
    }, [navSelc, lastSelc, store_stock])
    

    return(
        <div className="flex flex-row h-screen w-screen overflow-hidden bg-slate-800">
            <NavBar navSelc={navSelc} setNavSelc={setNavSelc} setLastSelc={setLastSelc}/>
            <FetchLayer />
            {selcComponent}
        </div>
    )
}


export default Layout;