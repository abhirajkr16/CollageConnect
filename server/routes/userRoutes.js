const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getMyProfile,
  updateMyProfile,
  followUser,
  unfollowUser,
  getUserById,
} = require("../controllers/userController");

const router = express.Router();

router.get("/me", authMiddleware, getMyProfile);
router.put("/me", authMiddleware, updateMyProfile);
router.post("/:userId/follow", authMiddleware, followUser);
router.post("/:userId/unfollow", authMiddleware, unfollowUser);
router.get("/:userId", authMiddleware, getUserById);

module.exports = router;
