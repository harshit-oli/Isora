import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { serverUrl } from '../App';
import { setLoopData } from '../redux/loopSlice';

    const GetAllLoops = () => {
    const dispatch=useDispatch();
    const {userData}=useSelector(state=>state.user)
    useEffect(()=>{
        const fetchPost=async ()=>{
            try {
                const result=await axios.get(`${serverUrl}/api/loop/getAll`,{withCredentials:true});
                dispatch(setLoopData(result.data))
            } catch (error) {
                console.log(error); 
            }
        }
        fetchPost();
    },[dispatch,userData]);
    }
    export default GetAllLoops