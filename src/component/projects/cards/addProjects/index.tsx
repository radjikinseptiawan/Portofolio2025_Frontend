import React from 'react'

export default function AddCards() {
  return (
<div className='rounded-xl shadow-2xl w-80 md:w-xl text-black m-2 bg-slate-900 p-8 hover:cursor-pointer hover:translate-x-8 transition-all' onClick={()=>console.log("adding data...")}>
    <div className='rounded-xl  flex-col justify-center flex items-center align-center w-full md:w-full border-8 p-4 border-slate-950 h-full'>
        <h1 className='text-9xl font-bold '>+</h1>
        <p className='text-3xl font-bold'>Tap For edit the project section</p>
    </div>
</div>
  )
}
