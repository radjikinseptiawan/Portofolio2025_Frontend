/* eslint-disable @next/next/no-img-element */
import { useOpen } from '@/context/addCards'
import { useToken } from '@/context/token'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

type DataStack = {
  id : number
  name : string
  icon_url : string
}

export default function AddCards() {
  const {open,setOpen} = useOpen()
  return (
<>
<div onClick={()=>setOpen(true)} className={` ${open ? "brightness-50 hover:translate-x-0 cursor-disabled transition-none hover:cursor-not-allowed z-0" : "hover:cursor-pointer hover:translate-x-8 transition-all z-0"} rounded-xl z-0 shadow-2xl w-80 md:w-xl text-black m-2 bg-slate-900 p-8`}>
    <div className='rounded-xl  flex-col justify-center flex items-center align-center w-full md:w-full border-8 p-4 border-slate-950 h-full'>
        <h1 className='text-9xl font-bold '>+</h1>
        <p className='text-3xl font-bold'>Tap For add the project</p>
    </div>
</div>
 {open && <OpenCardBench/>}
</>
)
}


function OpenCardBench(){
  const {setOpen} = useOpen()
  const [title,setTitle] = useState<string | undefined>('')
  const [option,setOption] = useState('')
  const [description,setDescription] = useState('')
  const refid = useRef<null | HTMLInputElement>(null)
  const {token} = useToken()
  const [stack,setStacks] = useState<DataStack[]>([])
  const [selectedStack,setSelectedStack] = useState<number[]>([])


  const getPhotos = ()=>{
    if(refid.current){
      return refid.current.click()
    }
  }
    
  
   const gettingStack = async()=>{
      const response = await fetch('http://localhost:3006/projects/stack',{method : "GET"})
      const data = await response.json()
      setStacks(data.data)
      return response
    }


  useEffect(()=>{
    gettingStack()
  },[]) 

  const addProject = async()=>{
    const response = await fetch(`http://localhost:3006/projects`,{
      method:'POST', 
      body : JSON.stringify({title,option,description,tech_stack_ids : selectedStack}),
      headers : {
        Authorization : `Bearer ${token}` 
      }
    })
    return response
  }

  const optionSelect = (e : ChangeEvent<HTMLSelectElement>)=>{
    const selected = Number(e.target.value)
    if(!selectedStack.includes(selected)){
      setSelectedStack(prev => [...prev,selected])
    }
    setOption('')
  }

  const titleChange = (e : ChangeEvent<HTMLInputElement>)=>{
    const target  = e.target.value
    setTitle(target)
    return 
  }

  const descriptionChange = (e : ChangeEvent<HTMLInputElement>)=>{
    const target = e.target.value
    setDescription(target)
    return
  }

  return(
    <>
    <div className='bg-white shadow-2xl top-20 p-8 fixed mx-auto w-screen md:w-6xl h-3xl rounded-xl'>
      <div className='flex flex-col'>
        <input type="text" placeholder='Title' onChange={titleChange} className='border-2 text-3xl p-2 rounded-2xl' />
        
        <div onClick={getPhotos} className='flex flex-col pt-5 text-center items-center background-url my-3 w-full h-full bg-slate-800 rounded-2xl justify-center'>
        <input ref={refid} type="file" className='border-2 text-3xl hidden rounded-2xl'/>
        <div className='text-center z-20'>
          <img src="/assets/image (1).svg" alt="" className='w-30' />
          <h1 className='font-bold text-xl text-slate-950 mb-10'>Add Photos</h1>
        </div>
        </div> 
        
        
          <select name="" id=""  onChange={(e)=>optionSelect(e)} className='border-2 text-3xl p-2 rounded-2xl'>
            <option value="undefined">....</option>
            {
              stack.map((item)=>{
                return(
                              <option value={item.id} key={item.id}>{item.name}</option>
                )
              })
            }
            </select>
      <input type="text" max={200} placeholder='Write something....' onChange={descriptionChange} className='border-2 my-2 text-3xl p-2 rounded-2xl'/>
      <div className='flex items-center'>
      <h1 className='my-2 font-bold text-xl'>Tech Stack :{selectedStack.join(", ")}</h1>
      </div>
      </div>
      <div className='flex  justify-center my-2'>
        <button onClick={()=>setOpen(false)} className='bg-red-600 w-1/4 hover:text-white cursor-pointer p-4 mx-2 font-bold text-red-900 rounded-xl md:w-1/8'>Cancel</button>
        <button onClick={addProject}className='bg-blue-600  hover:text-white cursor-pointer p-4 mx-2 font-bold text-blue-900 rounded-xl w-1/4 md:w-1/8'>Ok</button>
      </div>
    </div>
    </>
  )
}