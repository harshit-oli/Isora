import React from 'react'
import { IoMdArrowBack } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import NotificationCard from '../components/NotificationCard';

const Notifications = () => {
    const navigate=useNavigate();
    const {notificationData}=useSelector(state=>state.user)
  return (
    <div className='w-full h-[100vh] bg-black'>
      <div className='w-full h-[80px]  flex items-center gap-[20px] px-[20px] lg:hidden'><IoMdArrowBack className='text-white w-[25px] h-[25px] cursor-pointer'
             onClick={()=>{navigate("/")}}/>
              <h1 className='text-white text-[20px] font-semibold'>Notifications</h1>
            </div>

            <div className='w-full flex flex-col gap-[20px] h-[100%] overflow-auto px-[10px]'>
                {notificationData.map((noti,index)=>(
                    <NotificationCard noti={noti} key={index}/>
                ))}
            </div>
    </div>
  )
}

export default Notifications
