import React from 'react'
import logo2 from "../assets/logo2.png"
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../App';


const StoryCard = ({profileImage,userName,story}) => {
  const navigate=useNavigate();
  const {userData}=useSelector(state=>state.user);

  const handleViewers=async ()=>{
    try {
      const result=await axios.get(`${serverUrl}/api/story/view/${story?._id}`,{withCredentials:true})
    } catch (error) {
      console.log(error);
    }
  }
  const handleClick=()=>{
    if(!story && userName=="Your Story"){
       navigate("/upload");
    }else if(story && userName=="Your Story"){
      handleViewers();
       navigate(`/story/${userData.userName}`);
    }
    else{
      handleViewers();
      navigate(`/story/${userName}`);
    }
  }
  return (
   <div className='flex flex-col w-[80px]'>
     <div className={`w-[80px] h-[80px] ${story?"bg-gradient-to-b from-blue-500 to-blue-950": ""} rounded-full flex justify-center items-center relative`} onClick={handleClick}>
      <div className='w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer overflow-hidden'>
                  <img src={profileImage || logo2} alt=""  className='w-full object-cover'/>
                  {!story && userName=="Your Story" && <div>
                     <FaPlus className='text-white absolute bottom-1 right-1 font-bold text-2xl'/>
                    </div>}
      </div>
    </div>
    <div className='text-[14px] text-center truncate w-full text-white'>{userName}</div>
   </div>
  )
}
export default StoryCard
