import newsPng from "../../images/iconc-1.png";
import newsPngSelc from "../../images/iconc-2.png";
import EPSPng from "../../images/icon_info_emergency_1.png";
import EPSPngSelc from "../../images/icon_info_emergency_2.png";
import NLPng from "../../images/icon_info_basic_1.png";
import NLPngSelc from "../../images/icon_info_basic_2.png";
import DLPng from "../../images/icon_info_settings_1.png";
import DLPngSelc from "../../images/icon_info_settings_2.png";
import './_navBar.scss';
import { Layout_to_Nav_Props } from "../../interfaces/IfProps";


const NavBar: React.FC<Layout_to_Nav_Props>=({navSelc, setNavSelc, setLastSelc})=>{
    let navBarItems:string[] = ["news", "EPS", "new listing", "delisting"]
    let navBarImgSrc:string[] = [ newsPng, EPSPng, NLPng, DLPng ]
    let navBarImgSrc_selc:string[] = [ newsPngSelc, EPSPngSelc, NLPngSelc, DLPngSelc ]
    
    function handlingNavSelection(index:number){
        if(navSelc===100){
            setLastSelc([navSelc, "Dashboard"])
            setNavSelc(index)
            return
        }
        setLastSelc([navSelc, navBarItems[navSelc]])
        setNavSelc(index)    
    }

    let navBarFormat = navBarItems.map((items, index)=>{
        return <div className="w-100 h-10 fx-ccc"  key={items}>
            <div className={`${(navSelc===index)? "bgC-white br-10":""} w-80 h-60 cp fx-ccc`}
                onClick={()=>{handlingNavSelection(index)}}>
                <img src={(navSelc===index)? navBarImgSrc_selc[index]:navBarImgSrc[index]} 
                    alt={items} 
                    className="w-60"
                    />
            </div>
        </div>
    })

    
    return(
        <div className="w-4 h-100 bgC-black pos-f t-0 l-0">
            <div className="h-10 fx-ccc">
                <div className="icon-circle" onClick={()=>{handlingNavSelection(100)}}></div>
            </div>
            {navBarFormat}
        </div>
    )
}
export default NavBar