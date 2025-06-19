/* eslint-disable @next/next/no-img-element */
import { useOpen } from '@/context/addCards'
import { useEditMode } from '@/context/editMode'
import React from 'react'

export default function Button() {
  const {setEditMode,editMode} = useEditMode()
  const {open} = useOpen()
  console.log(editMode)
    return (
    <div onClick={()=> {if(open==false){setEditMode(!editMode)}}}  className='fixed shadow-2xl rounded-full bottom-20 right-20'>
        <button className={`flex active:bg-green-800 active:text-white text-green-900 bg-green-600 p-4 rounded-full shadow-2xs w-20 h-20 items-center justify-center  ${open ? "brightness-50 hover:cursor-not-allowed hover:shadow-2xl translate-y-0 transition-none" : " hover:translate-y-10 hover:cursor-pointer hover:shadow-2xl transition-all"}`}><img src={'/assets/edit.svg'} alt='edit' className='border-4 p-1flex items-center justify-center font-bold text-2xl rounded-full w-10 h-10'/></button>
    
    
    </div>
  )
}
