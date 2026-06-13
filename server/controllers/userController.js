const User = require("../models/User");

exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch profile", error: error.message });
  }
};

exports.updateMyProfile = async (req, res) => {
  try {
    const { bio, skills, college, profilePicture } = req.body;

    // Only selected profile fields are editable for simplicity.
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        bio: bio || "",
        skills: Array.isArray(skills)
          ? skills
          : typeof skills === "string"
          ? skills
              .split(",")
              .map((skill) => skill.trim())
              .filter(Boolean)
          : [],
        college: college || "",
        profilePicture: profilePicture || "",
      },
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Could not update profile", error: error.message });
  }
};

exports.followUser = async (req, res) => {
  try {
    const targetUserId = req.params.userId;

    if (targetUserId === req.user.id) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const me = await User.findById(req.user.id);
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({ message: "Target user not found" });
    }

    const alreadyFollowing = me.following.includes(targetUserId);
    if (alreadyFollowing) {
      return res.status(400).json({ message: "Already following this user" });
    }

    me.following.push(targetUserId);
    targetUser.followers.push(req.user.id);

    await me.save();
    await targetUser.save();

    res.json({
      message: "User followed successfully",
      followersCount: targetUser.followers.length,
      followingCount: me.following.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Could not follow user", error: error.message });
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    const targetUserId = req.params.userId;

    const me = await User.findById(req.user.id);
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({ message: "Target user not found" });
    }

    me.following = me.following.filter((id) => id.toString() !== targetUserId);
    targetUser.followers = targetUser.followers.filter((id) => id.toString() !== req.user.id);

    await me.save();
    await targetUser.save();

    res.json({
      message: "User unfollowed successfully",
      followersCount: targetUser.followers.length,
      followingCount: me.following.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Could not unfollow user", error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch user", error: error.message });
  }
};
