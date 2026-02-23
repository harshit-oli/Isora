import React, { useEffect, useState, useMemo } from 'react'
import logo2 from "../assets/logo2.png"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IoMdArrowBack } from 'react-icons/io'
import VideoPlayer from './VideoPlayer'
import { FaEye } from "react-icons/fa6";

const StoryPart = ({ storyData }) => {
  const { userData } = useSelector(state => state.user);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [showViewers, setShowViewers] = useState(false);

  const filteredViewers = useMemo(() => {
    return storyData?.viewers?.filter(
      (viewer) => viewer?._id?.toString() !== userData?._id?.toString()
    ) || [];
  }, [storyData?.viewers, userData?._id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          navigate("/");
          return 100;
        }
        return prev + 1;
      })
    }, 150)

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className='w-full max-w-[500px] h-[100vh] border-x-2 border-gray-800 pt-[10px] relative flex flex-col justify-center'>

      {/* Header */}
      <div className='flex items-center gap-[10px] absolute top-[30px] px-[10px]'>
        <IoMdArrowBack
          className='text-white w-[25px] h-[25px] cursor-pointer'
          onClick={() => navigate("/")}
        />

        <div className='flex items-center gap-[5px]'>
          <div
            className='w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-full cursor-pointer overflow-hidden'
            onClick={() => navigate(`/profile/${storyData.author?.userName}`)}
          >
            <img
              src={storyData?.author?.profileImage || logo2}
              alt=""
              className='w-full object-cover'
            />
          </div>
          <div className='w-[120px] truncate text-white'>
            {storyData?.author?.userName}
          </div>
        </div>
      </div>

      {/* Story Content */}
      {!showViewers && (
        <>
          <div className='w-full h-[90vh] flex items-center justify-center'>
            {storyData?.mediaType === "image" && (
              <div className='w-[90%] flex items-center justify-center'>
                <img
                  src={storyData?.media}
                  alt=""
                  className='w-[80%] rounded-2xl object-cover'
                />
              </div>
            )}

            {storyData?.mediaType === "video" && (
              <div className='w-[80%] flex flex-col items-center justify-center'>
                <VideoPlayer media={storyData?.media} />
              </div>
            )}
          </div>

          {/* Viewers Preview (Only for Story Owner) */}
          {storyData?.author?._id?.toString() === userData?._id?.toString() && (
            <div
              className='absolute text-white w-full flex items-center gap-[13px] h-[70px] cursor-pointer bottom-0 p-2 left-0'
              onClick={() => setShowViewers(true)}
            >
              <div className='flex items-center gap-[5px]'>
                <FaEye /> {filteredViewers.length}
              </div>

              <div className='flex relative'>
                {filteredViewers.slice(0, 3).map((viewer, index) => (
                  <div
                    key={viewer._id}
                    className={`w-[30px] h-[30px] rounded-full cursor-pointer overflow-hidden ${index > 0 ? "absolute" : ""}`}
                    style={index > 0 ? { left: `${index * 20}px` } : {}}
                  >
                    <img
                      src={viewer?.profileImage || logo2}
                      alt=""
                      className='w-full h-full object-cover'
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Progress Bar */}
      <div className='absolute top-[10px] w-full h-[5px] bg-gray-900'>
        <div
          className='h-full bg-white transition-all duration-700 ease-linear'
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Viewers List */}
      {showViewers && (
        <>
          <div
            className='w-full h-[30%] flex items-center justify-center mt-[100px] py-[30px] cursor-pointer overflow-hidden'
            onClick={() => setShowViewers(false)}
          >
            {storyData?.mediaType === "image" && (
              <img
                src={storyData?.media}
                alt=""
                className='h-[80%] rounded-2xl object-cover'
              />
            )}

            {storyData?.mediaType === "video" && (
              <VideoPlayer media={storyData?.media} />
            )}
          </div>

          <div className='w-full h-[70%] border-t-2 border-t-gray-800 p-[20px]'>
            <div className='text-white flex items-center gap-[10px]'>
              <FaEye />
              <span>{filteredViewers.length}</span>
              <span>Viewers</span>
            </div>

            <div className='w-full max-h-full flex flex-col gap-[10px] overflow-auto pt-[20px]'>
              {filteredViewers.map((viewer) => (
                <div key={viewer._id} className='w-full flex items-center gap-[20px]'>
                  <div className='flex items-center gap-[5px]'>
                    <div className='w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full overflow-hidden'>
                      <img
                        src={viewer?.profileImage || logo2}
                        alt=""
                        className='w-full object-cover'
                      />
                    </div>
                    <div className='w-[120px] truncate text-white'>
                      {viewer?.userName}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default StoryPart