import React, { useState } from 'react'
import axios from "axios"
import { serverUrl } from '../App'
import {ClipLoader} from "react-spinners"
import { useNavigate } from 'react-router-dom'
import {useDispatch} from "react-redux"
import { setUserData } from '../redux/userSlice'
const SignUp = () => {
    const [inputClicked,setInputClicked]=useState({
        name:false,
        userName:false,
        email:false,
        password:false,
    })
    const [loading,setLoading]=useState(false);
    const [name,setName]=useState("");
    const [userName,setUserName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [err,setErr]=useState("");
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handleSignUp=async()=>{
        setLoading(true);
        setErr("")
        try {
            const result=await axios.post(`${serverUrl}/api/auth/register`,
                {name,userName,email,password},{withCredentials:true}
            )
             dispatch(setUserData(result.data.user))
           setLoading(false);
        } catch (error) {
            setErr(error.response?.data?.message);
            console.log(error);
            setLoading(false);
        }
    }
  return (
    <div className="w-full h-screen bg-gradient-to-b 
    from-black to-gray-900 flex flex-col justify-center items-center">
        <div className='w-[90%] lg:max-w-[60%] h-[600px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border-2 border-[#1a1f23]'>
            <div className='w-full lg:w-[50%] h-full bg-white flex flex-col items-center p-[10px] gap-[20px] '>
                <div className='flex gap-[10px] items-center text-[20px] font-semibold mt-[40px]'>
                    <span>Sign Up to </span>
                    {/* <img src="" alt="" className='w-[70px]'/> */}
                </div>

                <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] border-2 border-black'
                onClick={()=>setInputClicked({...inputClicked,name:true})}>
                    <label htmlFor="name" className={`text-gray-700 absolute left-[13px] p-[5px] bg-white text-[15px] ${inputClicked.name ? "top-[-15px]":""}`}>Enter Your Name</label>
                        <input type="text" 
                        id='name' 
                        onChange={(e)=>setName(e.target.value)}
                        className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0 required'/>
                </div>
                <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black'
                onClick={()=>setInputClicked({...inputClicked,userName:true})}>
                    <label htmlFor="userName" className={`text-gray-700 absolute left-[13px] p-[5px] bg-white text-[15px] ${inputClicked.userName ? "top-[-15px]":""}`}>Enter Your UserName</label>
                        <input type="text"
                         id='userName'
                         onChange={(e)=>setUserName(e.target.value)}
                          className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0 required'/>
                </div>
                <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl  border-2 border-black'
                onClick={()=>setInputClicked({...inputClicked,email:true})}>
                    <label htmlFor="email" className={`text-gray-700 absolute left-[13px] p-[5px] bg-white text-[15px] ${inputClicked.email ? "top-[-15px]":""}`}>Enter Your Email</label>
                        <input type="email"
                         id='email'
                          onChange={(e)=>setEmail(e.target.value)}
                          className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0 required'/>
                </div>
                <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black'
                onClick={()=>setInputClicked({...inputClicked,password:true})}>
                    <label htmlFor="password" className={`text-gray-700 absolute left-[13px] p-[5px] bg-white text-[15px] ${inputClicked.password ? "top-[-15px]":""}`}>Enter Your Password</label>
                        <input type="password"
                         id='password'
                          onChange={(e)=>setPassword(e.target.value)}
                          className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0 required'/>
                </div>
                {err && 
                <p className='text-red-500'>{err} !</p>
                }
                <button onClick={handleSignUp} className='w-[70%] px-[20px] py-[10px] bg-black text-white  font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]'>{loading ?<ClipLoader size={30} color='white'/> :"Sign Up"}</button>
                <p>Already have an account ? <span className='border-b-2 border-b-black pb-[3px] text-black' onClick={()=> navigate("/login")}>Sign In</span></p>
            </div>
            <div className='md:w-[50%] h-full hidden lg:flex justify-center items-center bg-[#000000] flex-col gap-[10px] text-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl shadow-black'></div>
        </div>
    </div>
  )
}
export default SignUp
