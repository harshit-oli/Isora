import express from "express"
import { logIn, register, resetPassword, sendOtp, signOut, verifyOtp } from "../controllers/auth.controller.js";

const authRouter=express.Router();

authRouter.post("/register",register);
authRouter.post("/login",logIn);
authRouter.post("/sendOtp",sendOtp);
authRouter.post("/verifyOtp",verifyOtp);
authRouter.post("/resetPassword",resetPassword);
authRouter.get("/logout",signOut);

export default authRouter;

//"^5.1.0"