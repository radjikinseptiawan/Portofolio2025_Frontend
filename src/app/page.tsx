"use client"
import BioSection from "@/component/BioSection";
import ShowCardsProjects from "@/component/projects";
import Button from "@/component/projects/button";
import AddCards from "@/component/projects/cards/addProjects";
import { useEditMode } from "@/context/editMode";
import { useToken } from "@/context/token";
import { useEffect } from "react";

export default function Home() {
 const {token,setToken} = useToken()
 const {editMode} = useEditMode()
 useEffect(()=>{
  const getToken = localStorage.getItem('token')
  setToken(getToken as string)
 },[])


  return (
    <>
    <div className="mt-10">
    <BioSection/>
   </div>

   <div>
        { token && <Button/>}
   <div className="mt-10 h-xl overflow-y-auto grid grid-cols-1 mx-auto justify-items-center md:grid-cols-3">
    <ShowCardsProjects/>
    
    {editMode && <AddCards/>}
   </div>
   </div>
    </>
  );
}
