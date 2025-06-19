"use client"
import React, { useEffect, useState } from 'react'
import Cards from './cards'

type DataStack = {
    name : string,
    image : string
}

type CardType = {
    title : string,
    description : string,
    image_url : string,
    project_url : string,
    repo_url : string,
    tech_stack_project : DataStack
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
                    <div key={index}>
                    <Cards imageUrl={item.image_url !== '' ? item.image_url : `https://www.gynprog.com.br/wp-content/uploads/2017/06/wood-blog-placeholder.jpg`} repoUrl={item.repo_url} projectUrl={item.project_url} title={item.title} description={item.description}/>
                    </div>
                )
            })
        } 
    </>
  )
}
