

const express = require('express');
const router = express.Router();
const {
  createPost,
  getAllPosts,
  likePost,
  deletePost,
  getUserPosts,
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');


router.get('/', protect, getAllPosts);

router.post('/', protect, createPost);


router.get('/user/:id', protect, getUserPosts);

router.put('/:id/like', protect, likePost);

router.delete('/:id', protect, deletePost);

module.exports = router;
