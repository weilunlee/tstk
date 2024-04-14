import { useEffect, useState } from "react";
import { Layout_to_Nav_Props } from "../../interfaces/IfProps";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { SEARCH_STOCK, STOCK_CHOSEN, STOCK_RESET } from "../../stores/stocksSlice";
import { keyboardKey } from "@testing-library/user-event";
import GLOBAL_FUNC from "../../actions/globalFunc";

const NavBar: React.FC<Layout_to_Nav_Props>=({navSelc, setNavSelc, setLastSelc})=>{
    let navBarItems:string[] = ["MAIN", "STOCKS", "NEWS", "EPS", "BALENCE", "INCOME"]
    const dispatch = useAppDispatch()
    const searchList = useAppSelector(state=>state.stocks.searchBarList)
    const [searchText, setSearchText] = useState<string>("TWSE");
    const [focus, setFocus] = useState<boolean>(false);
    const [index, setIndex] = useState(0);
    function toggleFocus():void {setFocus(!focus)}
    useEffect(()=>{
        if(focus && searchText==="TWSE"){
            setSearchText("")
        }
    }, [focus, searchText])
    function handlingNavSelection(index:number){
        setLastSelc([navSelc, navBarItems[navSelc]])
        setNavSelc(index)
        dispatch(STOCK_RESET())
    }
    function pressKey(e:keyboardKey):void{
        setFocus(true)
        let _i = index
        if(e.key==="Escape"){
            setFocus(false)
        }
        else if(e.key==="ArrowDown"){
            _i++
            if(_i>=searchList.length) _i = searchList.length-1
            setIndex(_i)
            setSearchText(searchList[_i].Code)
        }
        else if(e.key==="ArrowUp"){
            _i--
            if(_i<=0) _i = 0
            setIndex(_i)
            setSearchText(searchList[_i].Code)
        }
        else if(e.key==="Enter"){selectStock(searchText)}
        else{setIndex(0)}
    }
    function search(_v:string){
        setSearchText(_v)
        dispatch(SEARCH_STOCK(_v))
    }
    function selectStock(_code:string){
        dispatch(STOCK_CHOSEN(_code))
        toggleFocus()
        setSearchText(_code)
    }
    let navBarFormat = navBarItems.map((items, index)=>{
        return <div className="w-auto h-12" key={items}>
            <div className={`${(navSelc===index)? "bg-slate-50 br-10 text-black rounded-r-2xl":""}  pl-2 flex justify-start items-center h-8 cursor-pointer `}
                onClick={()=>{handlingNavSelection(index)}}>
                <div className="font-extrabold tracking-[0.35rem]">{items}</div>
            </div>
        </div>
    })
    return(
        <div className="w-32 h-screen bg-slate-800 fixed pt-5 text-white flex flex-col">
            <div className="h-12 z-50" onClick={toggleFocus}>
                <div className={`pl-2 flex flex-row rounded-full hover:bg-slate-300 ${focus?"text-black bg-slate-200":""}`}>
                    <SearchIcon size="5" focus={focus}/>
                    <input onKeyDown={pressKey}
                        value={searchText}
                        onChange={e=>{search(e.target.value)}}
                        className="ml-2 w-20 font-extrabold tracking-wider bg-transparent focus:outline-none"/>
                </div>
                {focus?<div className="max-h-60 scrollbar overflow-y-auto">
                    {searchList.map((res, i)=><div key={res.Name}
                        onClick={()=>{selectStock(res.Code)}}
                        className={`flex flex-row bg-white w-full text-black border-b hover:bg-slate-300 ${i===index?"bg-slate-300":""}`}>
                        <div>{res.Code}</div>-<div>{GLOBAL_FUNC.abbreviate(res.Name, 3)}</div>
                    </div>)}
                </div>:null}
            </div>
            {navBarFormat}
        </div>
    )
}
export default NavBar

interface SearchIconIF{
    size:string,
    focus:boolean
}
function SearchIcon({size, focus}:SearchIconIF):JSX.Element{
    return <div className={`w-${size} h-${size} flex flex-row justify-center items-center`}>
        <div className={`rounded-full w-[60%] h-[60%] border-2 ${focus?"border-black":"border-white"}`}></div>
        <div className={`-rotate-45 h-[40%] w-0 border translate-y-2/3 ${focus?"border-black":"border-white"}`}></div>
    </div>
}