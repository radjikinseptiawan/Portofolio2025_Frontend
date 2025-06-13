"use client";
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useEffect, useState } from "react";

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

export default function BioSection() {
  const [user, setUser] = useState<UserData | null>(null);
  const [width,setWidth] = useState<number>(0)
  const [height,setHeight]= useState<number>(0)
  
  
  useEffect(() => {
    const innerWidth = ()=>setWidth(window.innerWidth)
    const innerHeight = ()=>setHeight(window.innerHeight)
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3006");
        const data = await response.json();
        setUser(data[0]);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    
    window.addEventListener("resize",innerWidth)
    window.addEventListener("resize",innerHeight)
    fetchUser();

    return ()=> {
      window.removeEventListener("resize",innerWidth)
      window.removeEventListener("resize",innerHeight)
    }
    }, [width,height]);

  return (
    <div className="flex items-center gap-6 p-6 justify-center md:justify-start border-b-2 border-white bg-slate-800">
      <div>
        <Image
          src="https://i.pinimg.com/736x/23/9b/02/239b0228c8f3a6f2b4dbb5a864802d7d.jpg"
          width={width < 600 ? 200 : 150}
          height={height < 800 ? 200 : 150}
          alt="User Avatar"
          className="bg-white transition hover:brightness-90 cursor-pointer p-1 rounded-full"
        />
      </div>

      <div className="text-white">
        <h1 className="text-xl md:text-3xl font-bold hover:brightness-110 transition">
          {user?.username || "Unknown User"}
        </h1>
        <p className="text-base mt-1 text-slate-300">
          {user?.bio || "No bio provided."}
        </p>

        <div className="flex gap-4 mt-4">
          <button
            onClick={() => window.location.href = `${user?.social_media.profile_link}`}
            className="bg-white p-3 rounded-xl hover:brightness-90 transition"
          >
            <img src="/assets/linkedin (1).svg" alt="LinkedIn" className="w-5 h-5" />
          </button>
          <button
            onClick={() => window.location.href = `${user?.social_media.profile_link2}`  }
            className="bg-white p-3 rounded-xl hover:brightness-90 transition"
          >
            <img src="/assets/github (1).svg" alt="GitHub" className="w-5 h-5" />
          </button>
         
        </div>
      </div>
    </div>
  );
}
