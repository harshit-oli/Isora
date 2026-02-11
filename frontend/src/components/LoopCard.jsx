import React, { useEffect, useRef, useState } from 'react'
import { FiVolume2, FiVolumeX } from 'react-icons/fi';

const LoopCard = ({loop}) => {
  const [isPlaying,setIsPlaying]=useState(true);
  const [isMute,setIsMute]=useState(false);
  const [progress,setProgress]=useState(0);
   const videoRef=useRef();
   useEffect(()=>{
    const observer=new IntersectionObserver(([entry])=>{
      const video=entry.target;
      if(entry.isIntersecting){
        video.play();
        setIsPlaying(true)
      }
      else{
        video.pause();
        setIsPlaying(false)
      } 
    },{threshold:0.6})
    if(videoRef.current){
      observer.observe(videoRef.current);
    }

    return ()=>{
      if(videoRef.current){
      observer.unobserve(videoRef.current);
    }
    }
   },[]);


   const handleClick=()=>{
       if(isPlaying){
        videoRef.current.pause();
        setIsPlaying(false)
       }
       else{
        videoRef.current.play()
        setIsPlaying(true)
       }
   }
   
    if(videoRef.current){
    videoRef.current.muted = isMute;
    }


    const handleTimeUpdate=()=>{
      const video= videoRef.current;
      if(video){
        const percent=(video.currentTime / video.duration)*100;
        setProgress(percent);
      }
    }
  return (
    <div className='w-full lg:w-[480px] h-[100vh] flex items-center justify-center border-l-2 border-r-2 border-gray-800 relative'>
        <video ref={videoRef} autoPlay loop src={loop?.media} className='w-full max-h-full' onClick={handleClick} onTimeUpdate={handleTimeUpdate}/>
        <div className='absolute bottom-[10px] right-[10px] cursor-pointer' onClick={()=>setIsMute(!isMute)}>
                {!isMute ? <FiVolume2 className='w-[20px] h-[20px] text-white font-semibold'/> 
                : <FiVolumeX className='w-[20px] h-[20px] text-white font-semibold'/>}
        </div>
        <div className='absolute bottom-0 w-full h-[5px] bg-gray-900'>
          <div className='w-[200px] h-full bg-white transition-all duration-700 ease-linear' style={{width:`${progress}%`}}></div>
        </div>
    </div>
  )
}

export default LoopCard

