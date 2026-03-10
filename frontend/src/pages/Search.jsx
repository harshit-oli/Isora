import React, { useEffect, useState } from 'react'
import { IoMdArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { IoSearchSharp } from "react-icons/io5";
import axios from 'axios';
import { serverUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchData } from '../redux/userSlice';
import logo2 from "../assets/logo2.png"


const Search = () => {
  const navigate=useNavigate();
  const [input,setInput]=useState("");
  const dispatch=useDispatch();
 const {searchData} = useSelector((state) => state.user);

  const handleSearch=async()=>{
     if(!input.trim()) return;
    try {
      const result =await axios.get(`${serverUrl}/api/user/search?keyword=${input}`,{withCredentials:true})
      dispatch(setSearchData(result.data))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    if(input.trim() === "") return;
   handleSearch();
  },[input])
  return (
    <div className='w-full min-h-[100vh] bg-black flex items-center flex-col gap-[20px]'>
       <div className='w-full h-[80px]  flex items-center gap-[20px] px-[20px] absolute top-0'><IoMdArrowBack className='text-white w-[25px] h-[25px] cursor-pointer'
             onClick={()=>{navigate("/")}}/>
            </div>

            <div className='w-full h-[80px] flex items-center justify-center  mt-[80px]'>
              <form className='w-[90%] max-w-[800px] h-[80%] rounded-full bg-[#0f1414] flex items-center px-[20px]'>
                <IoSearchSharp className='w-[18px] h-[18px] text-white '/>
                <input type="text" placeholder='search...' className='w-full h-full outline-0 rounded-full px-[20px] text-white text-[18px]'
                onChange={(e)=>setInput(e.target.value)} value={input}/>
              </form>
            </div>
            {input && searchData?.map((user,index)=>(
              <div key={index} className='w-[90vw] max-w-[700px] h-[60px] rounded-full bg-white flex items-center gap-[20px] px-[20px] hover:bg-gray-200' onClick={()=>navigate(`/profile/${user?.userName}`)}>
                <div className='w-[50px] h-[50px] border-2 border-black rounded-full cursor-pointer overflow-hidden'>
                  <img src={user?.profileImage || logo2} alt="" className='w-full object-cover'/>
                </div>
                <div className='text-black text-[18px] font-semibold'>
                  <div>{user?.userName}</div>
                  <div className='text-[14px] text-gray-400'>{user?.name}</div>
                </div>
              </div>
            ))
          }

          {!input && <div className='text-[30px] text-gray-700'>Search Here...</div>}

      
    </div>
  )
}

export default Search
