"use client"
import React, { createContext, SetStateAction, useContext, useState } from "react";

type TokenType = {
    token : string,
    setToken : React.Dispatch<SetStateAction<string>>
}
const TokenContext = createContext<TokenType | undefined>(undefined)

export const TokenGlobalState = ({children} : {children : React.ReactNode})=>{
    const [token,setToken] = useState<string>('')
    return(
        <>
        <TokenContext.Provider value={{token,setToken}}>
            {children}
        </TokenContext.Provider>
        </>
    )
}

export const useToken = ()=>{
    const context = useContext(TokenContext)
    if(context == undefined){
        throw new Error('error')
    }
    return context
}