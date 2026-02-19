import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setStoryData } from '../redux/storySlice'
import StoryPart from '../components/StoryPart'

const Story = () => {
  const {storyData}=useSelector(state=>state.story);
  const {userName}=useParams();
  const dispatch=useDispatch();
  const handleStory=async ()=>{
    try {
        const result=await axios.get(`${serverUrl}/api/story/getByUserName/${userName}`,{withCredentials:true})
        dispatch(setStoryData(result.data.story[0]));
        console.log(storyData);
    } catch (error) {
        console.log(error);
    }
  }
   useEffect(()=>{
      if(userName){
        handleStory()
      }
    },[userName])
  return (
    <div className='w-full h-[100vh] bg-black flex justify-center items-center'>
      <StoryPart/>
    </div>
  )
}

export default Story
