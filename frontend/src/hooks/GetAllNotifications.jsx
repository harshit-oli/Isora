    import React, { useEffect } from 'react'
    import { useDispatch, useSelector } from 'react-redux'
    import axios from 'axios';
    import { serverUrl } from '../App';
    import { setNotificationData } from '../redux/userSlice';

    const GetAllNotifications = () => {
    const dispatch=useDispatch();
    const {userData}=useSelector(state=>state.user)
    useEffect(()=>{
        const fetchNotifications=async ()=>{
            try {
                const result=await axios.get(`${serverUrl}/api/user/getAllNotifications`,{withCredentials:true});
                dispatch(setNotificationData(result.data))
            } catch (error) {
                console.log(error); 
            }
        }
        fetchNotifications();
    },[dispatch,userData]);
    }
    export default GetAllNotifications
