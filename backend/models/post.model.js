import mongoose from "mongoose";

const postSchema=new mongoose.model({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    mediaType:{
        type:String,
        enum:["Image","Video"],
        required:true,
    },
    media:{
        type:String,
        required:true,
    },
    caption:{
        type:String,
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
     comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
},{timeStamps:true})

const Post=mongoose.model("Post",postSchema);
export default Post