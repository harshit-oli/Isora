import React, { useEffect, useState } from 'react'
import logo2 from "../assets/logo2.png"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IoMdArrowBack } from 'react-icons/io'
import VideoPlayer from './VideoPlayer'


const StoryPart = ({storyData}) => {
  const navigate=useNavigate();
  const [progress,setProgress]=useState(0);

  useEffect(()=>{
    const interval=setInterval(()=>{
      setProgress(prev=>{
        if(prev>=100){
          clearInterval(interval);
          navigate("/");
          return 100;
        }
        return prev+1;
      })
    },150)

    return ()=>clearInterval(interval);
  },[navigate]);
  return (
    <div className='w-full max-w-[500px] h-[100vh] border-x-2 border-gray-800 pt-[10px] relative flex flex-col justify-center'>
      <div className='flex items-center gap-[10px] absolute top-[30px] px-[10px]'>
        <IoMdArrowBack className='text-white w-[25px] h-[25px] cursor-pointer'
               onClick={()=>{navigate("/")}}/>
         <div className='flex  items-center gap-[5px]'>
         <div className='w-[40px] h-[40px] md:w-[60px] md:h-[60px] border-2 border-black rounded-full cursor-pointer overflow-hidden' onClick={()=>navigate(`/profile/${storyData.author?.userName}`)}>
         <img src={storyData?.author?.profileImage || logo2} alt=""  className='w-full object-cover'/>
         </div>
         <div className='w-[120px] truncate text-white'>{storyData?.author?.userName}</div>
         </div>
      </div>

      <div className='w-full h-[90vh] flex items-center justify-center'>
                  {
                  storyData?.mediaType=="image" && <div className='w-[90%] flex items-center justify-center'>
                    <img src={storyData?.media} alt="" className='w-[80%] rounded-2xl object-cover'/>
                  </div>
                  }
                  {
                  storyData?.mediaType=="video" && <div className='w-[80%] flex flex-col items-center justify-center'>
                    <VideoPlayer media={storyData?.media}/>
                  </div>
                  }
      </div> 
       <div className='absolute top-[10px] w-full h-[5px] bg-gray-900'>
          <div className='w-[200px] h-full bg-white transition-all duration-700 ease-linear' style={{width:`${progress}%`}}></div>
        </div>
    </div>
  )
}

export default StoryPart
