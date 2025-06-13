"use client"
import React, { useEffect, useState } from 'react'

export default function Navigation() {
    const [token,setToken] = useState<string | undefined>(undefined)
    const [active,setIsActive]= useState<boolean>(false)
    useEffect(()=>{
        const tokenSaved = localStorage.getItem("token")
        setToken(tokenSaved as string)
    },[])
    return (
    <div className='bg-slate-900 top-0 fixed p-2 w-screen flex justify-end'>
        {
            token ?
            <>
            <button onClick={()=>setIsActive(!active)} className="bg-white p-3 rounded-xl hover:brightness-90 transition">
                   <img src="/assets/menu (4).svg" alt="Login" className="w-5 h-5" />
        
            </button>

            {
            active &&
            <ul className='fixed top-15 right-0'> 
            {
                [{text : "Opsi 1",img:""},{text : "Opsi 2",img:""},{text : "Opsi 3",img:""},{text : "log-out",img:"/assets/log-in.svg"}].map((item,index)=>{
                    return(
                        <div className='transition-all cursor-pointer hover:p-4 border-b p-3 w-screen md:w-xl bg-white border-b-slate-900' key={index++}>
                        <li><img src={item.img}/> {item.text}</li>
                        </div>
                    )
                })
            }
            </ul>
            }
            </>

            :

             <a
            href="/login"
            className="bg-white p-3 rounded-xl hover:brightness-90 transition"
          >
            <img src="/assets/log-in.svg" alt="Login" className="w-5 h-5" />
          </a>
        
        }
    </div>
  )
}
