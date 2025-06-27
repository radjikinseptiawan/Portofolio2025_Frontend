/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import BioSection from "@/component/BioSection";
import ShowCardsProjects from "@/component/projects";
import Button from "@/component/projects/button";
import AddCards from "@/component/projects/cards/addProjects";
import TechStackPractice from "@/component/TechStackPractice";
import { useOpen } from "@/context/addCards";
import { useEditMode } from "@/context/editMode";
import { useToken } from "@/context/token";
import { useEffect } from "react";

export default function Home() {
 const {token,setToken} = useToken()
 const {open} = useOpen()
 const {editMode} = useEditMode()
 useEffect(()=>{
  const getToken = localStorage.getItem('token')
  setToken(getToken as string)
 },[])


  return (
    <div className={`${open ? "bg-black/60" : ""}`}>
    <div className="mt-10">
    <BioSection/>
   </div>
   <div>

    <div>
     <h1 className="text-slate-950 text-5xl my-3 border-b mx-3 text-center md:text-start font-bold">Technical Skill</h1>
    <div className="p-2 bg-white my-2 flex justify-center">
     <TechStackPractice/>
    </div>
    </div>
  
  
   { token && <Button/>}
   <div className="my-8">
   <h1 className="text-slate-950 text-5xl my-3 border-b mx-3 text-center md:text-start font-bold">Projects</h1>
   <div className="mt-10 h-xl overflow-y-auto grid grid-cols-1 mx-auto justify-items-center md:grid-cols-3">
    <ShowCardsProjects/>
    
    {editMode && <AddCards/>}
   </div>
   </div>
   </div>
    </div>
  );
}
