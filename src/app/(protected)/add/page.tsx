/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function page() {
  const router = useRouter()

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(!token){
      router.replace("/")
    }
  },[])
  return (
    <div>
      <div className='p-8 bg-white'></div>
    </div>
  )
}
