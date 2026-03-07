import React from 'react'
import { IoMdArrowBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import OnlineUser from '../components/OnlineUser';
import { setSelectedUser } from '../redux/messageSlice';
import logo2 from "../assets/logo2.png"

const Messages = () => {
  const navigate=useNavigate();
  const {userData}=useSelector(state=>state.user)
   const {onlineUsers}=useSelector(state=>state.socket);
    const {prevChatUsers}=useSelector(state=>state.message);
    const dispatch=useDispatch();
  return (
    <div className='w-full min-h-[100vh] flex flex-col bg-black gap-[20px] p-[20px]'>
      <div className='w-full h-[80px]  flex items-center gap-[20px] px-[20px]'><IoMdArrowBack className='text-white lg:hidden w-[25px] h-[25px] cursor-pointer'
             onClick={()=>{navigate(`/`)}}/>
              <h1 className='text-white text-[20px] font-semibold'>Messages</h1>
            </div>
            <div className='w-full h-[80px] flex gap-[20px] justify-start items-center overflow-x-auto p-[20px] border-b-2 border-gray-800'>
              {userData?.following?.map((user,index)=>(
              ( onlineUsers?.includes(user._id) && <OnlineUser user={user} key={index}/>)
              ))}
            </div>
            
            <div className='w-full h-full overflow-auto flex flex-col gap-[20px]'>
              {prevChatUsers?.map((user,index)=>(
                <div className='text-white cursor-pointer w-full flex items-center gap-[10px]' key={index} onClick={()=>{
                    dispatch(setSelectedUser(user))
                    navigate("/messageArea")
                }}>
                  {
                    onlineUsers?.includes(user._id) ? <OnlineUser user={user}/>
                     : <div className='w-[50px] h-[50px] rounded-full cursor-pointer overflow-hidden'>
                                      <img src={user.profileImage || logo2} alt=""  className='w-full object-cover' onClick={()=> navigate(`/profile/${user?.userName}`)}/>
                                  </div>
                  }
                <div className='flex flex-col'>
                <div className='text-white text-[18px] font-semibold'>{user.userName}</div>
                {onlineUsers?.includes(user?._id) && <div className='text-blue-500 text-[15px]'>Active</div>}

              </div>
                </div>
              ))}
            </div>
    </div>
  )
}

export default Messages