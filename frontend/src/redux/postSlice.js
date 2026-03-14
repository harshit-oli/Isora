import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "post",
    initialState: {
        postData: [],
        savedPosts: [],  // ← add karo
    },
    reducers: {
        setPostData: (state, action) => {
            state.postData = action.payload;
        },
        setSavedPosts: (state, action) => {  // ← add karo
            state.savedPosts = action.payload;
        }
    }
})

export const { setPostData, setSavedPosts } = postSlice.actions;
export default postSlice.reducer;