

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: [true, 'Post content cannot be empty'],
      maxlength: [500, 'Post cannot exceed 500 characters'],
    },
    // Array of user IDs who liked this post
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
