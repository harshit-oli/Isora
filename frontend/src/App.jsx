import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import { useDispatch, useSelector } from 'react-redux'
import GetCurrentUser from './hooks/GetCurrentUser'
import Home from './pages/Home'
import GetSuggestedUsers from "./hooks/GetSuggestedUsers"
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Upload from './pages/Upload'
import GetAllPost from './hooks/GetAllPost'
import Loops from './pages/Loops'
import GetAllLoops from './hooks/getAllLoops'
import Story from './pages/Story'
import GetAllStories from './hooks/GetAllStories'
import Messages from './pages/Messages'
import MessageArea from './pages/MessageArea'
import { io } from "socket.io-client"
import { setOnlineUsers } from './redux/socketSlice'
import { SocketContext } from './context/SocketContext'
import GetFollowingList from './hooks/GetFollowingList'
import GetPrevChatUsers from './hooks/GetPrevChatUsers'
import Search from './pages/Search'
import GetAllNotifications from './hooks/GetAllNotifications'
import Notifications from './pages/Notifications'
import { setNotificationData } from './redux/userSlice'

export const serverUrl = "https://isora-backend.onrender.com"

const App = () => {
  const {userData,notificationData} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (userData) {
      const socketIo = io(serverUrl, {
        query: { userId: userData._id }
      })

      socketIo.on('getOnlineUsers', (users) => {
         console.log("online users:", users)
         console.log("dispatching...")
        dispatch(setOnlineUsers(users))
      })

      setSocket(socketIo)

      return () => {
        socketIo.close()
        setSocket(null)
      }
    }
  }, [userData])

    socket?.on("newNotification",(noti)=>{
      dispatch(setNotificationData([...notificationData,noti]));
    })

  return (
    <SocketContext.Provider value={socket}>
      <div>
        <GetAllPost/>
        <GetCurrentUser/>
        <GetAllLoops/>
        <GetSuggestedUsers/>
        <GetAllStories/>
        <GetFollowingList/>
        <GetPrevChatUsers/>
        <GetAllNotifications/>
        <Routes>
          <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to={"/"} />} />
          <Route path='/login' element={!userData ? <SignIn /> : <Navigate to={"/"} />} />
          <Route path='/' element={userData ? <Home /> : <Navigate to={"/login"} />} />
          <Route path='/forgot-password' element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />} />
          <Route path='/profile/:userName' element={userData ? <Profile /> : <Navigate to={"/login"} />} />
          <Route path='/story/:userName' element={userData ? <Story /> : <Navigate to={"/login"} />} />
          <Route path='/editProfile' element={userData ? <EditProfile /> : <Navigate to={"/login"} />} />
          <Route path='/messages' element={userData ? <Messages /> : <Navigate to={"/login"} />} />
          <Route path='/messageArea' element={userData ? <MessageArea /> : <Navigate to={"/login"} />} />
          <Route path='/upload' element={userData ? <Upload /> : <Navigate to={"/login"} />} />
          <Route path='/loops' element={userData ? <Loops /> : <Navigate to={"/login"} />} />
          <Route path='/search' element={userData ? <Search/> : <Navigate to={"/login"} />} />
            <Route path='/notifications' element={userData ? <Notifications/> : <Navigate to={"/login"} />} />
        </Routes>
      </div>
    </SocketContext.Provider>
  )
}

export default App
