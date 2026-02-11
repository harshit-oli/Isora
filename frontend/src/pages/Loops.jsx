import React from 'react'
import { IoMdArrowBack } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import LoopCard from '../components/LoopCard';

const Loops = () => {
    const navigate=useNavigate();
    const {loopData}=useSelector(state=>state.loop);
  return (
    <div className='w-full h-full bg-black overflow-hidden flex justify-center items-center'>
      <div className='w-full h-[80px]  flex items-center gap-[20px] px-[20px] absolute top-[10px] left-[10px] z-[100]'><IoMdArrowBack className='text-white w-[25px] h-[25px] cursor-pointer'
             onClick={()=>{navigate("/")}}/>
              <h1 className='text-white text-[20px] font-semibold'>Loops</h1>
            </div>
            <div className='h-[100vh] overflow-y-scroll snap-y snap-mandatory scrollbar-hide'>
                {loopData.map((loop,index)=>(
                    <div key={index} className='h-screen snap-start'>
                    <LoopCard loop={loop}/>
                    </div>
                ))}
            </div>
    </div>
  )
}

export default Loops
