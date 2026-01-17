import React from 'react'
import logo2 from "../assets/logo2.png"
import { CiHeart } from "react-icons/ci";
import VideoPlayer from './VideoPlayer'
import { useSelector } from 'react-redux';
import { FaHeart } from "react-icons/fa6";
import { MdInsertComment } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";

const Post = ({postData}) => {
  const {userData}=useSelector((state)=>state.user);
  return (
    <div className='w-[90%] min-h-[450px] flex flex-col gap-[10px]
     bg-white items-center shadow-2xl shadow-[#00000058] rounded-2xl pb-[20px]'>
      <div className='w-full h-[80px] flex justify-between items-center px-[10px]'>
         <div className='flex justify-center items-center gap-[10px] md:gap-[20px]'>
         <div className='w-[40px] h-[40px] md:w-[60px] md:h-[60px] border-2 border-black rounded-full cursor-pointer overflow-hidden'>
         <img src={postData.author?.profileImage || logo2} alt=""  className='w-full object-cover'/>
         </div>
         <div className='w-[120px] font-semibold truncate'>{postData.author?.userName}</div>
         </div>
         <button className='px-[10px] w-[60px] md:w-[100px] py-[5px] h-[30px] md:h-[40px] bg-[black] text-white rounded-2xl text-[14px] md:text-[16px]'>Follow</button>
      </div>
      <div className='w-[90%] flex items-center justify-center'>
                  {
                  postData.mediaType=="image" && <div className='w-[90%] flex items-center justify-center'>
                    <img src={postData.media} alt="" className='w-[80%] rounded-2xl object-cover'/>
                  </div>
                  }
                  {
                  postData.mediaType=="video" && <div className='w-[80%] flex flex-col items-center justify-center'>
                    <VideoPlayer media={postData.media}/>
                  </div>
                  }
      </div> 
      <div className='w-full h-[60px] flex justify-between items-center px-[20px] mt-[10px]'>
        <div className='flex justify-center  items-center gap-[10px]'>
          <div className='flex justify-center items-center gap-[5px]'>
            {!postData.likes.includes(userData._id) && <CiHeart className='w-[25px] cursor-pointer h-[25px]'/>}
            {postData.likes.includes(userData._id) && <FaHeart className='w-[25px] cursor-pointer h-[25px] text-red-600'/>}
            <span>{postData.likes.length}</span>
          </div>
          <div className='flex justify-center items-center gap-[5px]'>
            <MdInsertComment className='w-[25px] cursor-pointer h-[25px]'/>
            <span>{postData.comments.length}</span>
          </div>
        </div>
        <div>
          {!userData.saved.includes(postData?._id) && <FaRegBookmark className='w-[25px] cursor-pointer h-[25px]'/>}
           {userData.saved.includes(postData?._id) && <FaBookmark className='w-[25px] cursor-pointer h-[25px]'/>}
        </div>
      </div>

      <div>
        <h1>{postData.author.userName}</h1>
        <div>{postData.caption}</div>
      </div>
    </div>
  )
}

export default Post
