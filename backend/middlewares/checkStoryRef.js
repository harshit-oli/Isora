import User from "../models/user.model.js";

export const checkStoryRef = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("story");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Agar story expire ho chuki hai
    if (user.story === null) {
      await User.findByIdAndUpdate(user._id, { story: null });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};