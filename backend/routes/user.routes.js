import express from "express"   
import isAuth from "../middlewares/isAuth.js";
import { editProfile, follow, followingList, getAllNotifications, getCurrentUser, getProfile, markAsRead, search, suggestedUsers } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.js";
import { checkStoryRef } from "../middlewares/checkStoryRef.js";

const userRouter=express.Router();

userRouter.get("/current",isAuth,getCurrentUser)
userRouter.get("/suggested",isAuth,suggestedUsers)
userRouter.get("/getProfile/:userName",isAuth,checkStoryRef,getProfile)
userRouter.post("/editProfile",isAuth,upload.single("profileImage"),editProfile) 
userRouter.get("/follow/:targetUserId",isAuth,follow);
userRouter.get("/followingList",isAuth,followingList);
userRouter.get("/search",isAuth,search);
userRouter.get("/getAllNotifications",isAuth,getAllNotifications);
userRouter.get("/markAsRead/:notificationId",isAuth,markAsRead);

//////--Note->---- req.file hume upload.single likhne se mil jayega-----////////

export default userRouter;