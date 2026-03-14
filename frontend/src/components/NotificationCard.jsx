import React from 'react'
import logo2 from "../assets/logo2.png"

const NotificationCard = ({noti}) => {
  return (
    <div className="w-full flex justify-between p-[5px] items-center min-h-[50px] bg-gray-800 rounded-full">
     <div className='flex gap-[10px] items-center'>
      <div className='w-[40px] h-[40px]  rounded-full cursor-pointer overflow-hidden'>
                        <img src={noti?.sender.profileImage || logo2} alt=""  className='w-full object-cover'/>
                    </div>

                    <div className='flex flex-col'>
                      <h1 className='text-white text-[16px] font-semibold'>{noti?.sender.userName}</h1>
                      <div className='text-[15px] text-gray-200'>{noti?.message}</div>
                    </div>
     </div>
      
      <div className='w-[40px] h-[40px] rounded-full overflow-hidden'>
      {noti?.loop 
      ?
      <video src={noti?.loop?.media} muted loop className='w-full h-full object-cover'/> 
      :
      noti?.post?.mediaType=="image" ?
      <img src={noti?.post?.media} className='h-full object-cover'/>
      :
      noti?.post?
      <video src={noti?.loop?.media} muted loop className='w-full h-full object-cover'/>
      :
      null}
     </div>
      
    </div>
  )
}

export default NotificationCard
