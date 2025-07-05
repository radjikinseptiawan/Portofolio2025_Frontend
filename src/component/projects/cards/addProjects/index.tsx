/* eslint-disable @next/next/no-img-element */
import { useOpen } from '@/context/addCards'
import { useToken } from '@/context/token'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect, useReducer, useRef } from 'react'

type DataStack = {
  id : number
  name : string
  icon_url : string
}

export default function AddCards() {
  const {open,setOpen} = useOpen()
  return (
<>
<div onClick={()=>setOpen(true)} className={` ${open ? "brightness-50 hover:translate-x-0 cursor-disabled transition-none hover:cursor-not-allowed z-0" : "hover:cursor-pointer hover:translate-x-8 transition-all z-0"} rounded-xl z-0 shadow-2xl w-80 md:w-xl text-gray-800 m-2 bg-gray-400 p-8`}>
    <div className='rounded-xl  flex-col justify-center flex items-center align-center w-full md:w-full border-8 p-4 border-gray-500 h-full'>
        <h1 className='text-9xl font-bold '>+</h1>
        <p className='text-3xl font-bold'>Tap For add the project</p>
    </div>
</div>
 {open && <OpenCardBench/>}
</>
)
}

type StateType = {
  title : string,
  option : string,
  description : string,
  stack : DataStack[],
  selectedStack : number[],
  file : File | null,
  urlProject : string,
  urlRepo : string,
  url : string
} 

const initialState :StateType= {
  title: '',
  option : '',
  description : '',
  stack : [],
  selectedStack : [],
  file : null,
  urlProject :'',
  urlRepo : '',
  url : ''
}

type ActionType = 
| {type : "SET_TITLE",payload:string}
| {type : "SET_OPTION",payload:string}
| {type : "SET_DESCRIPTION",payload:string}
| {type : "SET_STACK",payload:DataStack[]}
| {type : "SET_SELECTED_STACK",payload:number[]}
| {type : "SET_FILE", payload : File | null}
| {type : "SET_URL",payload : string}
| {type : "SET_URL_PROJECT",payload : string}
| {type : "SET_URL_REPO", payload : string}
| {type : "RESET"}

const reducer = (state : StateType,action : ActionType)=>{
  switch(action.type){
    case 'SET_TITLE':
      return {...state,title:action.payload}
    case 'SET_OPTION':
      return {...state,option:action.payload}
    case 'SET_DESCRIPTION':
      return {...state,description:action.payload}
    case 'SET_STACK':
      return {...state,stack:action.payload}
    case 'SET_SELECTED_STACK':
      return {...state,selectedStack:action.payload}
    case 'SET_FILE':
      return {...state,file:action.payload}
    case 'SET_URL':
      return {...state,url:action.payload}
    case 'SET_URL_PROJECT':
      return {...state,urlProject:action.payload}
    case 'SET_URL_REPO':
      return {...state,urlRepo:action.payload}
    case 'RESET':
      return initialState
    default:
      return state
  }
}

function OpenCardBench(){
  const {setOpen} = useOpen()
  const [state,dispatch] = useReducer(reducer,initialState)
  const refid = useRef<null | HTMLInputElement>(null)
  const {token} = useToken()
  const getPhotos = ()=>{
    if(refid.current){
      refid.current.click()
    }
  }

  const handleImageChange = async (e : ChangeEvent<HTMLInputElement>)=>{
    const selected = e.target.files?.[0]
    if(selected){
      dispatch({type:"SET_FILE",payload:selected})
      dispatch({type: "SET_URL", payload:URL.createObjectURL(selected)})
    }
  }
  
  const upImage = async ()=>{
    if(!state.file) return null 

    const formData = new FormData()
    formData.append("file",state.file as File)

    try{
      const response = await fetch('http://localhost:3006/projects/add_image',{
        method : "POST",
        body : formData
      })
      const data = await response.json()
      
      if(data.publicUrl){
        dispatch({type:"SET_URL",payload:data.publicUrl})
        return data.publicUrl
      }
    }catch(error){
      console.log(error)
    }

  }

   const gettingStack = async()=>{
      const response = await fetch('http://localhost:3006/projects/stack',{method : "GET"})
      const data = await response.json()
      dispatch({type:"SET_STACK",payload:data.data})
      return response
    }


  useEffect(()=>{
    gettingStack()
  },[]) 

  const route = useRouter()
 const addProject = async () => {
  try {

    const imageUrl = await upImage()
    const response = await fetch("http://localhost:3006/projects", {
      method: "POST",
      body: JSON.stringify({
        title : state.title,
        option : state.option,
        description : state.description,
        repo_url : state.urlRepo,
        image_url : imageUrl,
        project_url : state.urlProject,
        tech_stack_ids: state.selectedStack,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })

    if (!response.ok) {
      const errorRes = await response.json()
      console.error("API error:", errorRes)
      throw new Error("Gagal mengirim data ke server")
    }

    setOpen(false)
    route.replace("/")
    return response
  } catch (error) {
    console.error("Terjadi error:", error)
  }
}


  const optionSelect = (e : ChangeEvent<HTMLSelectElement>)=>{
    const selected = Number(e.target.value)
    if(!state.selectedStack.includes(selected)){
      const updateStack = [...state.selectedStack,selected]
      dispatch({type:"SET_SELECTED_STACK", payload : updateStack} )
    }
    dispatch({type:"SET_OPTION",payload:''})
  }

  const titleChange = (e : ChangeEvent<HTMLInputElement>)=>{
    const target  = e.target.value
    dispatch({type : "SET_TITLE",payload : target})
    return 
  }

  const descriptionChange = (e : ChangeEvent<HTMLInputElement>)=>{
    const target = e.target.value
    dispatch({type : "SET_DESCRIPTION",payload:target})
    return
  }


  return(
    <>
    <div className='bg-white shadow-2xl top-20 p-8 overflow-y-scroll md:overflow-auto fixed mx-auto w-screen md:w-6xl h-xl md:h-3xl rounded-xl'>
      <div className='flex flex-col'>
        <input type="text" placeholder='Title' onChange={titleChange} className='border-2 text-3xl p-2 rounded-2xl' />
        
        <div onClick={getPhotos} className='flex flex-col py-5 text-center items-center background-url my-3 w-full h-full bg-gray-400 rounded-2xl justify-center'>
        <input type="file" ref={refid} onChange={handleImageChange} className='hidden'/>
        {state.url ? <img src={state.url} width={ window.innerWidth < 500 ?120 : 400} height={window.innerHeight < 700 ? 120 : 400} alt="" /> : <img src="/assets/image (1).svg" width={window.innerWidth < 500 ? 50 : 400} height={window.innerHeight < 700 ? 50 : 400}/>}
        </div> 
        
        
          <select name="" id=""  value={state.option}  onChange={(e)=>optionSelect(e)} className='border-2 text-3xl p-2 rounded-2xl'>
            <option value="undefined">....</option>
            {
              state.stack.map((item)=>{
                return(
                              <option value={item.id} key={item.id}>{item.name}</option>
                )
              })
            }
            </select>
      <input type="text" maxLength={200} placeholder='Write something....' onChange={descriptionChange} className='border-2 my-2 text-3xl p-2 rounded-2xl'/>
      <input type="text" placeholder='Repository Link....' onChange={(e)=>dispatch({type:"SET_URL_REPO",payload:e.target.value})} className='border-2 my-2 text-3xl p-2 rounded-2xl'/>
      <input type="text" placeholder='Project Link....' onChange={(e)=>dispatch({type:"SET_URL_PROJECT",payload:e.target.value})} className='border-2 my-2 text-3xl p-2 rounded-2xl'/>
      <div className='flex items-center'>
      <h1 className='my-2 font-bold text-xl'>Tech Stack :{state.selectedStack.join(", ")}</h1>
      </div>
      </div>
      <div className='flex  justify-center my-2'>
        <button onClick={()=>setOpen(false)} className='bg-red-600 w-1/4 hover:text-white cursor-pointer p-4 mx-2 font-bold text-red-900 rounded-xl md:w-1/8'>Cancel</button>
        <button onClick={addProject}className='bg-blue-600  hover:text-white cursor-pointer p-4 mx-2 font-bold text-blue-900 rounded-xl w-1/4 md:w-1/8'>Ok</button>
      </div>
    </div>
    </>
  )
}