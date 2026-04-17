const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createPost,
  getAllPosts,
  toggleLikePost,
  deletePost,
} = require("../controllers/postController");

const router = express.Router();

router.get("/", authMiddleware, getAllPosts);
router.post("/", authMiddleware, createPost);
router.put("/:postId/like", authMiddleware, toggleLikePost);
router.delete("/:postId", authMiddleware, deletePost);

module.exports = router;
