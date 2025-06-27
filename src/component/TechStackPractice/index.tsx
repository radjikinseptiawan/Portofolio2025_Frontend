'use client'

import React, { useEffect, useState } from 'react'

interface TypeStack{
  icon_url : string,
  id : number
}

export default function TechStackPractice() {
  const [data, setData] = useState<TypeStack[]>([])

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('http://localhost:3006/projects/stack')
        const result = await response.json()
        setData(result.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    getData()
  }, [])

  return (
    <div className='flex items-center w-2xl gap-5 overflow-x-scroll'>
      {data.map((item) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.icon_url} alt='' key={item.id} width={80} />
      ))}
    </div>
  )
}
