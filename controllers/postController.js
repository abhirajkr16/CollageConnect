
const Post = require('../models/Post');


const createPost = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim() === '') {
      return res.status(400).json({ message: 'Post content cannot be empty' });
    }

    const post = await Post.create({
      author: req.user._id,
      content: content.trim(),
    });


    await post.populate('author', 'name profilePicture college');

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name profilePicture college')  // Join with user data
      .sort({ createdAt: -1 });                            // Newest first
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── PUT /api/posts/:id/like ──────────────────
// Toggle like/unlike on a post (protected)
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const alreadyLiked = post.likes.includes(req.user._id);

    if (alreadyLiked) {
      // Remove user from likes array
      post.likes = post.likes.filter(
        (id) => id.toString() !== req.user._id.toString()
      );
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();

    res.json({
      likes: post.likes,
      likesCount: post.likes.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── DELETE /api/posts/:id ────────────────────
// Delete a post (only the author can do this, protected)
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Authorization check — only the author can delete their own post
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── GET /api/posts/user/:id ──────────────────
// Get all posts by a specific user (for their profile page)
const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.id })
      .populate('author', 'name profilePicture college')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPost, getAllPosts, likePost, deletePost, getUserPosts };
