/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client"
import { useEditMode } from '@/context/editMode'
import { useToken } from '@/context/token'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Navigation() {
    const {token,setToken} = useToken()
    const [active,setIsActive]= useState<boolean>(false)
    const {setEditMode} = useEditMode()
    useEffect(()=>{
        const tokenSaved = localStorage.getItem("token")
        setToken(tokenSaved as string)
    },[])

    const route = useRouter()

    const removeToken = ()=>{
     localStorage.clear()
     setToken("")
     setEditMode(false)
     route.refresh()
     return
    }

    const addUser = ()=>{
     return window.location.href = "/register"
    }
    return (
    <div className='bg-slate-900 top-0 fixed p-2 w-screen z-20 flex justify-end'>
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
                [{
                  text : "Opsi 1",
                  img:"/assets/log-in.svg",
                  handler : ()=> console.log('On progress')                },{
                  text : "Add User",
                  img:"/assets/user-plus.svg",
                  handler : addUser},
                  {
                  text : "Opsi 3",
                  img:"/assets/log-in.svg",
                  handler : ()=> console.log('On progress')
                  },
                  {
                  text : "log-out",
                  img:"/assets/log-in.svg",
                  handler : removeToken
                }].map((item,index)=>{
                    return(
                        <div onClick={item.handler} className='transition-all cursor-pointer hover:p-4 border-b p-3 w-screen md:w-xl bg-white border-b-slate-900' key={index++}>
                        <li className=' flex items-center gap-2'><img src={item.img}/> {item.text}</li>
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
            <img src="/assets/key (1).svg" alt="Login" className="w-5 h-5" />
          </a>
        
        }
    </div>
  )
}
