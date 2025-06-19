"use client"
import React, { createContext, SetStateAction, useContext, useState } from "react";


type isEditMode = {
    editMode : boolean,
    setEditMode : React.Dispatch<SetStateAction<boolean>>
}
const EditMode = createContext<isEditMode | undefined>(undefined);


export function EditModeComponent ({children} : {children : React.ReactNode}){
    const [editMode,setEditMode] = useState<boolean>(false)
    return(
        <>
        <EditMode.Provider value={{editMode,setEditMode}}>
        {children}
        </EditMode.Provider>
        </>
    )
}

export function useEditMode (){
    const useEditMode = useContext(EditMode)
    if(useEditMode === undefined){
        throw new Error("error")
    }
    return useEditMode
}