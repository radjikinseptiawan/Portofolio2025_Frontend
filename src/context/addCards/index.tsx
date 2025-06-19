"use client"
import React, { createContext, SetStateAction, useContext, useState } from "react";

type BooleanType = {
    open : boolean,
    setOpen : React.Dispatch<SetStateAction<boolean>>
}
const OpenContext = createContext<BooleanType | undefined>(undefined)

export function OpenCardContext({children} : {children : React.ReactNode}){
    const [open,setOpen] = useState<boolean>(false)
    return(
        <>
        <OpenContext.Provider value={{open,setOpen}}>
        {children}
        </OpenContext.Provider>
        </>
    )
}

export function useOpen(){
    const context = useContext(OpenContext)
    if(context === undefined){
        throw new Error("Error")
    }
    return context
}