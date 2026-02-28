import React from 'react'
import { IoMdArrowBack } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import logo2 from "../assets/logo2.png"

const MessageArea = () => {
  const {selectedUser}=useSelector(state=>state.message)
  const navigate=useNavigate();
  return (
    <div className='w-full h-[100vh] bg-black relative'>
      <div className='w-full flex items-center gap-[15px] px-[20px] py-[10px] fixed top-0 z-[100] bg-black w-full'>
              <div className='h-[80px]  flex items-center gap-[20px] px-[20px]'><IoMdArrowBack className='text-white w-[25px] h-[25px] cursor-pointer'
                     onClick={()=>{navigate(`/`)}}/>
                    </div>
       <div className='w-[40px] h-[40px] rounded-full cursor-pointer overflow-hidden'>
                        <img src={selectedUser.profileImage || logo2} alt=""  className='w-full object-cover' onClick={()=> navigate(`/profile/${selectedUser?.userName}`)}/>
       </div>  
       <div className='text-white text-[18px] font-semibold'>
         <div>{selectedUser.userName}</div>
          <div className='text-[15px] text-gray-400'>{selectedUser.name}</div>
       </div> 
      </div>

      <div className='w-full h-[80px] fixed bottom-0 flex justify-center items-center bg-black z-[100]'>

        <form className='w-[90%] max-w-[800px] h-[80%] rounded-full bg-[#131616] flex items-center gap-[10px] px-[20px] relative'>
          <input type="text" placeholder='Message' className='w-full h-full px-[20px] text-[18px] text-white outline-0' />
        </form>
      </div>
      
    </div>
  )
}

export default MessageArea
