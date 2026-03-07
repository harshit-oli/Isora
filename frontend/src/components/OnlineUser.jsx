import React from 'react'
import { useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSelectedUser } from '../redux/messageSlice';
import logo2 from "../assets/logo2.png"

const OnlineUser = ({user}) => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
  return (
    <div className='w-[50px] h-[50px] flex gap-[20px] justify-start items-center relative'>
       <div className='w-[50px] h-[50px] rounded-full cursor-pointer overflow-hidden' onClick={()=>{
        dispatch(setSelectedUser(user))
        navigate(`/messageArea`)
       }}>
                        <img src={user.profileImage || logo2} alt=""  className='w-full object-cover'/>
                    </div>
                    <div className='w-[10px] h-[10px] bg-[#0080ff] rounded-full absolute top-0 right-0'>

                    </div>
    </div>
  )
}

export default OnlineUser
