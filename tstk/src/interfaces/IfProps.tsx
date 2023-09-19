export interface LayoutProps{
    setNavSelc: (val:number)=>void,
    lastSelc:[number, string]
}
export interface Layout_to_Nav_Props{
    navSelc:number,
    setNavSelc: (val:number)=>void,
    setLastSelc: (val:[number, string])=>void
}
export interface OnOff_switch{
    onBool:boolean,
    toggleOn:(val:boolean)=>void
}