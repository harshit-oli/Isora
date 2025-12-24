import express from "express"   
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
import { getStoryUserName, uploadStory, viewStory } from "../controllers/story.controller.js";

const storyRouter=express.Router();

storyRouter.post("/upload",isAuth,upload.single("media"),uploadStory)
storyRouter.get("/getByUserName/:userName",isAuth,getStoryUserName)
storyRouter.get("/view/:storyId",isAuth,viewStory)

//////--Note->---- req.file hume upload.single likhne se mil jayega-----////////

export default storyRouter;