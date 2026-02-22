export const checkStoryRef = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate("story");

    if (!user) {
      return next(); // user nahi mila toh bhi next pe ja
    }

    if (user.story === null) {
      await User.findByIdAndUpdate(user._id, { story: null });
    }
    
    next();
  } catch (err) {
    next(); // error pe bhi block mat kar
  }
};