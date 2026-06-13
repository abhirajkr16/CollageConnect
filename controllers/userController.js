const User = require("../models/User");

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.name || user.name;
    user.bio = req.body.bio ?? user.bio;
    user.college = req.body.college ?? user.college;
    user.skills = req.body.skills ?? user.skills;
    user.profilePicture = req.body.profilePicture ?? user.profilePicture;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      bio: updatedUser.bio,
      college: updatedUser.college,
      skills: updatedUser.skills,
      profilePicture: updatedUser.profilePicture,
      followers: updatedUser.followers,
      following: updatedUser.following,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } })
      .select("-password")
      .limit(20);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const followUser = async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: "You can't follow yourself" });
    }

    const targetUser = await User.findById(req.params.id); // person to follow
    const currentUser = await User.findById(req.user._id); // logged-in user

    if (!targetUser) return res.status(404).json({ message: "User not found" });

    const alreadyFollowing = currentUser.following.includes(req.params.id);

    if (alreadyFollowing) {
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== req.params.id,
      );

      targetUser.followers = targetUser.followers.filter(
        (id) => id.toString() !== req.user._id.toString(),
      );
    } else {
      // ── Follow ──
      currentUser.following.push(req.params.id);
      targetUser.followers.push(req.user._id);
    }

    await currentUser.save();
    await targetUser.save();

    res.json({
      message: alreadyFollowing
        ? "Unfollowed successfully"
        : "Followed successfully",
      following: currentUser.following,
      followersCount: targetUser.followers.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserProfile, updateUserProfile, getAllUsers, followUser };
