"use client";
import { useState } from "react";
import "../globals.css";

export default function Page() {
  const [email,setEmail] = useState<string | undefined>(undefined)
  const [password,setPassword] = useState<string | undefined>(undefined)


  const iAmAdmin = async ()=>{
    try{
const response = await fetch('http://localhost:3006/login',{method : 'POST',
   body : JSON.stringify({email,password}),
   headers :{'Content-Type' : 'application/json',   Authorization: `Bearer ${localStorage.getItem("token")}`},

})
    const data = await response.json() 
    if(response.ok){
      localStorage.setItem('token', data.token)
      window.location.href = "/"
    }
    console.log(data.data)
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-slate-800">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-80">
        <h1 className="font-bold text-center text-2xl text-slate-800 mb-6">
          Login
        </h1>
        <p className=" text-center text-xl text-slate-800 mb-6">
          Just only developer
        </p>
        <form className="flex flex-col space-y-4" action={"/"}>
          <input
            type="text"
            placeholder="Username"
            className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
            onChange={(e)=>setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
            onChange={(e)=>setPassword(e.target.value)}
         />
          <button
            type="submit"
            className="bg-slate-700 hover:bg-slate-900 text-white font-semibold py-3 rounded-md transition-colors"
            onClick={iAmAdmin}
         >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
