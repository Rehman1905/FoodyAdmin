'use client'
import { createContext, useState } from "react";

export const dataContext=createContext()
export default function DataContext({children}){
    const [newData, setNewdata] = useState({
        display:false,
        data:'add product',
        editData:{}
    })
    // const [product,setProduct]=useState(false)
    return(
    <dataContext.Provider value={[newData,setNewdata]}>
        {children}
    </dataContext.Provider>
    )
}