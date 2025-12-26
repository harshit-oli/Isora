import React from 'react'
import { GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { SiYoutubeshorts } from "react-icons/si";
import { FaPlus } from "react-icons/fa";
import logo2 from "../assets/logo2.png"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Nav = () => {
  const navigate=useNavigate();
  const {userData}=useSelector(state=>state.user);
  return (
    <div className='w-[90%] lg:w-[40%] h-[80px] bg-black flex justify-around items-center fixed bottom-[20px] rounded-full shadow-2xl shadow-[#000000] z-[100]'>
      <div className='text-white w-[60px] h-[20px] cursor-pointer text-xl'><GoHomeFill /></div>
      <div className='text-white w-[60px] h-[20px] cursor-pointer text-xl'><FaSearch /></div>
      <div className='text-white w-[60px] h-[20px] cursor-pointer text-xl' onClick={()=>navigate("/upload")}><FaPlus /></div>
      <div className='text-white w-[60px] h-[20px] cursor-pointer text-xl'><SiYoutubeshorts/></div>
      <div className='w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden'>
                  <img src={userData?.profileImage || logo2} alt=""  className='w-full object-cover' onClick={()=> navigate(`/profile/${userData.userName}`)}/>
       </div>
    </div>
  )
}

export default Nav
