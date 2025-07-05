"use client";
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useEffect, useReducer, useState } from "react";
import '../../app/globals.css'
import { useEditMode } from "@/context/editMode";
import { useOpen } from "@/context/addCards";

interface socialMediaType{
  profile_link :string;
  profile_link2 : string;
}

interface UserData {
  username: string;
  bio: string;
  profile_picture_url : string;
  social_media : socialMediaType
}

type StateType = {
  user : UserData
}

const initialState : StateType = {
  user: {
    username: "",
    bio: "",
    profile_picture_url: "",
    social_media: {
      profile_link: "",
      profile_link2: ""
    }
  }
}

type ActionType = |{type : "FETCH_START"}|{type : "FETCH_SUCCESS",payload : UserData}|{type:"FETCH_ERROR"}

const reducer = (state : StateType,action : ActionType)=>{
  switch(action.type){
    case 'FETCH_START':
      return {...state}
    case 'FETCH_SUCCESS':
      return {user : action.payload}
    case 'FETCH_ERROR':
      return {...state}
    default:
    return state
  }
}

export default function BioSection() {
  const [width,setWidth] = useState<number>(0)
  const [height,setHeight]= useState<number>(0)
  const [state,dispatch] = useReducer(reducer,initialState)
  
  const {editMode} = useEditMode()
  const {open} = useOpen()


  const fetchingData = async ()=>{
    dispatch({type : "FETCH_START"})
    try {
        const response = await fetch('http://localhost:3006/',{method : "GET"})
        const result = await response.json();
        dispatch({type : "FETCH_SUCCESS",payload : result.data[0]})
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    }; 
  
  
  useEffect(() => {
    const innerWidth = ()=>setWidth(window.innerWidth)
    const innerHeight = ()=>setHeight(window.innerHeight)
    
    window.addEventListener("resize",innerWidth)
    window.addEventListener("resize",innerHeight)
    fetchingData();

    return ()=> {
      window.removeEventListener("resize",innerWidth)
      window.removeEventListener("resize",innerHeight)
    }
    }, [width,height]);

  return (
    <div className={`bg-section ${open ? "brightness-50" : ""} bg-slate-800 flex items-center gap-6 p-6 justify-center md:justify-start border-b-2 border-white`}>
      <div>
        {
          state.user && state.user.profile_picture_url &&
        <img
          src={`${state.user ? state.user?.profile_picture_url : "https://i.pinimg.com/736x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg"}`}
          width={width < 600 ?  150 : 200}
          height={height < 800 ? 75 : 90}
          alt="User Avatar"
          className={`bg-white transition hover:brightness-90 cursor-pointer p-1 rounded-full ${editMode ? "cursor-pointer bg-black/80 brightness-50" : ""}`}
        />
      }
      </div>

      <div className="text-white">
        <h1 className="text-xl md:text-3xl font-bold hover:brightness-110 transition">
          {state.user?.username || "Unknown User"}
        </h1>
        <p className="text-base mt-1 text-slate-300">
          {state.user?.bio || "No bio provided."}
        </p>

        <div className="flex gap-4 mt-4">
          <button
            onClick={() => window.location.href = `${state.user?.social_media.profile_link}`}
            className="bg-white p-3 rounded-xl hover:brightness-90 transition"
          >
            <img src="/assets/linkedin (1).svg" alt="LinkedIn" className="w-5 h-5" />
          </button>
          <button
            onClick={() => window.location.href = `${state.user?.social_media.profile_link2}`  }
            className="bg-white p-3 rounded-xl hover:brightness-90 transition"
          >
            <img src="/assets/github (1).svg" alt="GitHub" className="w-5 h-5" />
          </button>
         
        </div>
      </div>
    </div>
  );
}
