
import newsPng from "../../assests/images/icona-1.png"
import newsPngSelc from "../../assests/images/iconc-2.png";
import EPSPng from "../../assests/images/icon_info_emergency_1.png";
import EPSPngSelc from "../../assests/images/icon_info_emergency_2.png";
import NLPng from "../../assests/images/icon_info_basic_1.png";
import NLPngSelc from "../../assests/images/icon_info_basic_2.png";
import DLPng from "../../assests/images/icon_info_settings_1.png";
import DLPngSelc from "../../assests/images/icon_info_settings_2.png";
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
        return <div className="w-auto h-16 flex justify-center items-center"  key={items}>
            <div className={`${(navSelc===index)? "bg-white br-10":""} p-2 w-12 h-12 rounded-xl cursor-pointer `}
                onClick={()=>{handlingNavSelection(index)}}>
                <img src={(navSelc===index)? navBarImgSrc_selc[index]:navBarImgSrc[index]} 
                    alt={items} 
                    className="w-60"
                    />
            </div>
        </div>
    })

    
    return(
        <div className="w-16 h-screen bg-black fixed">
            <div className="h-16 flex flex-col justify-center items-center">
                <div className="icon-circle" onClick={()=>{handlingNavSelection(100)}}></div>
            </div>
            {navBarFormat}
        </div>
    )
}
export default NavBar