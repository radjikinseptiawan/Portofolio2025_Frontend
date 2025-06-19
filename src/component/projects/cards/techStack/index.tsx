/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useEffect, useState } from 'react'

type DataStack = {
    name : string,
    image : string
}

export default function TechStack() {
const [techStack,setTechStack] = useState<DataStack[]>([])  
  
const fetchingProjects = async ()=>{
    try{
    const response = await fetch("http://localhost:3006/projects",{method : "GET"})
    const data = await response.json()
    const getData = data.data.flatMap((project : any) =>{
       return project.tech_stack_project.map((item : any)=>item.tech_stacks)
    })
    setTechStack(getData)
    }catch(error){
        console.log(error)
    }
}

useEffect(()=>{
    fetchingProjects()
},[])
    return (
    <div className='flex gap-2 justify-center border-b-2 border-t-2 p-2 border-dashed'>
        {
            techStack.map((item,index)=>{
            return(
            <div key={index++}>
                <img src={item.image} className='rounded-full w-10 md:w-20' alt={item.name} />                
            </div>
            )
            })
        }
    </div>
  )
}
