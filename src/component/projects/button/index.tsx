/* eslint-disable @next/next/no-img-element */
import { useEditMode } from '@/context/editMode'
import React from 'react'

export default function Button() {
  const {setEditMode,editMode} = useEditMode()

  console.log(editMode)
    return (
    <div onClick={()=>setEditMode(!editMode)} className='fixed shadow-2xl rounded-full bottom-20 right-20'>
        <button className='flex active:bg-green-800 active:text-white hover:translate-y-10 items-center justify-center hover:cursor-pointer hover:shadow-2xl transition-all text-green-900 bg-green-600 p-4 rounded-full shadow-2xs w-20 h-20'><img src={'/assets/edit.svg'} alt='edit' className='border-4 p-1 w-10 h-10 flex items-center justify-center font-bold text-2xl rounded-full w-10 h-10'/></button>
    
    
    </div>
  )
}
