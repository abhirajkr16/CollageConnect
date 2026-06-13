

const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  followUser,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');


router.get('/', protect, getAllUsers);


router.put('/profile', protect, updateUserProfile);


router.get('/:id', protect, getUserProfile);


router.put('/:id/follow', protect, followUser);

module.exports = router;
