    import React, { useEffect } from 'react'
    import { useDispatch, useSelector } from 'react-redux'
    import axios from 'axios';
    import { serverUrl } from '../App';
    import { setFollowing, setUserData } from '../redux/userSlice';
import { setCurrentUserStory } from '../redux/storySlice';

    const GetCurrentUser = () => {
    const dispatch=useDispatch();
    const {storyData}=useSelector(state=>state.story);
    useEffect(()=>{
        const fetchUser=async ()=>{
            try {
                const result=await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true});
                dispatch(setUserData(result.data))
                dispatch(setFollowing(result.data.following))
                dispatch(setCurrentUserStory(result.data.story))
            } catch (error) {
                console.log(error); 
            }
        }
        fetchUser();
    },[storyData]);
    }

    export default GetCurrentUser
