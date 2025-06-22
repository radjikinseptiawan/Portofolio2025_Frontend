/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { useOpen } from '@/context/addCards'
import { useToken } from '@/context/token'


type CardType = {
    title : string,
    description : string,
    imageUrl : string,
    created_at : string,
    projectUrl : string,
    repoUrl : string,
    action : ()=> void
}

export default function Cards({title,created_at,description,repoUrl,projectUrl,imageUrl,action} :CardType) {
 const {open} = useOpen()
 const {token} = useToken()
 return (
<div className={`rounded-xl shadow-2xl w-80 md:w-xl text-black m-2 bg-white p-8 ${open ? "brightness-50" : ""}`}>
            <h1 className='text-3xl font-bold m-2'>{title}</h1>
            <div className='border-t-2 p-2 text-center flex justify-center'>
                <img src={imageUrl} width={350} height={350} alt="" />
            </div>
            <div className='my-4 overflow-y-auto'>
                <p>
               {description}
                </p>
                {created_at}
            </div>
            <div className='flex gap-2 justify-between'>
                {token && <a className='bg-red-800 p-2 rounded-lg' onClick={action}><img src="/assets/trash-2.svg" alt="" /></a>}
                <div className='flex justify-end gap-3'>
                    <button onClick={()=> window.location.href = `${repoUrl}`} className='bg-blue-600 text-blue-800 hover:text-white p-2 rounded-md   cursor-pointer hover:shadow-xl transition-all hover:p-1'>View Code</button>
                    <button onClick={()=> window.location.href = `${projectUrl}`} className='bg-green-600  p-2 transition-all hover:p-1 hover:shadow-xl text-green-950 hover:text-white rounded-md cursor-pointer'>View Project</button>
                </div>
            </div>
        </div>
  )
}
