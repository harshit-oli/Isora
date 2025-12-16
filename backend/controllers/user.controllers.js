import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";

export const getCurrentUser=async(req,res)=>{
    try {
        const userId=req.userId;
        const user=await User.findById(userId);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user not found",
            })
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"internal server error",
        })
    }

}


export const suggestedUsers=async (req,res)=>{
    try {
        const users=await User.find({
            _id:{$ne:req.userId}
        }).select("-password");
        return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({
            success:false,
            message:`get suggested users error ${error}`,
        })  
    }
}

export const editProfile=async (req,res)=>{
    try {
        const {name,userName,bio,profession,gender}=req.body;
        const user=await User.findById(req.userId).select("-password")
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        const sameUserWithUserName=await User.findOne({userName}).select("-password")
        if(sameUserWithUserName && sameUserWithUserName._id !== req.userId){
            return res.status(400).json({message:"User Already Exist"})
        }
        let profileImage;
        if(req.file){
            profileImage=await uploadOnCloudinary(req.file.path)
        }
         user.name=name
         user.userName=userName
         user.profileImage=profileImage
         user.bio=bio
         user.profession=profession
         user.gender=gender
         await user.save();
         return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`Edit profile Error ${error}`
        })
    }
}

export const getProfile=async(req,res)=>{
    try {
        const {userName}=req.params;
        const user=await User.findOne({userName}).select("-password");
        if(!user){
            return res.status(400).json({message:"user not found"});
        }
        return res.status(200).json({
            success:true,
            message:"user found",
            user,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`user profile Error ${error}`
        })
    }
}