    import React, { useEffect } from 'react'
    import { useDispatch, useSelector } from 'react-redux'
    import axios from 'axios';
    import { serverUrl } from '../App';
import { setStoryList } from '../redux/storySlice';

    const GetAllStories = () => {
    const dispatch=useDispatch();
    const {userData}=useSelector(state=>state.user);
    useEffect(()=>{
        const fetchStories=async ()=>{
            try {
                const result=await axios.get(`${serverUrl}/api/story/getAll`,{withCredentials:true});
                dispatch(setStoryList(result.data))
            } catch (error) {
                console.log(error); 
            }
        }
        fetchStories();
    },[userData]);
    }

    export default GetAllStories
