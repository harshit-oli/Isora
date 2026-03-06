import { createSlice } from "@reduxjs/toolkit";

const SocketSlice=createSlice({
    name:"socket",
    initialState:{
        onlineUsers:null,
    },
    reducers:{
       setOnlineUsers:(state,action)=>{
        state.onlineUsers=action.payload 
      }
    }
})

export const {setSocket,setOnlineUsers}=SocketSlice.actions;
export default SocketSlice.reducer;