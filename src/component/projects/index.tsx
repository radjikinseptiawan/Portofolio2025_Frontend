"use client"
import React, { useEffect, useState } from 'react'
import Cards from './cards'

type DataStack = {
    id : number,
    name : string,
    icon_url : string,
}

type techStack = {
    tech_stacks : DataStack
}

type CardType = {
    title : string,
    description : string,
    image_url : string,
    project_url : string,
    repo_url : string,
    tech_stack_project : techStack[]
}

export default function ShowCardsProjects() {
const [projects,setProjects] = useState<CardType[]>([])  
  
const fetchingProjects = async ()=>{
    try{
    const response = await fetch("http://localhost:3006/projects",{method : "GET"})
    const data = await response.json()
    setProjects(data.data)
    }catch(error){
        console.log(error)
    }

}

useEffect(()=>{
    fetchingProjects()
},[])


return (
    <>
        {
            projects.map((item,index)=>{
                return(
                    <div key={index++}>
                    <Cards imageUrl={item.image_url !== '' ? item.image_url : `https://www.gynprog.com.br/wp-content/uploads/2017/06/wood-blog-placeholder.jpg`} repoUrl={item.repo_url} projectUrl={item.project_url} title={item.title} description={item.description}/>
                    <div className='flex gap-3 bg-white rounded-lg justify-center shadow-xl'>
                    {item.tech_stack_project.map((item)=>{
                    return(
                        <div className='rounded-lg' key={item.tech_stacks.id}>
                        <img width={80} height={80} className='rounded-lg p-3 text-black' src={item.tech_stacks.icon_url} alt={item.tech_stacks.name}/>
                        </div>
                    )    
                    })}
                    </div>
                    </div>
                )
            })
        } 
    </>
  )
}
