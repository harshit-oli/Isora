import React from 'react'
import { IoMdArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom'

const Loops = () => {
    const navigate=useNavigate();
  return (
    <div className='w-screen h-screen bg-black overflow-hidden flex justify-center items-center'>
      <div className='w-full h-[80px]  flex items-center gap-[20px] px-[20px] absolute top-[10px] left-[10px]'><IoMdArrowBack className='text-white w-[25px] h-[25px] cursor-pointer'
             onClick={()=>{navigate("/")}}/>
              <h1 className='text-white text-[20px] font-semibold'>Loops</h1>
            </div>
    </div>
  )
}

export default Loops
