import { useEffect, useState } from "react";
import { createPost, deletePost, getAllPosts, toggleLike } from "../services/postService";
import { getMyProfile, getUserById, followUser, unfollowUser } from "../services/userService";
import PostCard from "../components/PostCard";

const DashboardPage = () => {
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState(null);
  const [postText, setPostText] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      const [postsData, profileData] = await Promise.all([getAllPosts(), getMyProfile()]);
      setPosts(postsData);
      setProfile(profileData);
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Could not load dashboard");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreatePost = async (event) => {
    event.preventDefault();
    if (!postText.trim()) return;

    try {
      await createPost({ text: postText });
      setPostText("");
      loadData();
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Could not create post");
    }
  };

  const handleLike = async (postId) => {
    try {
      await toggleLike(postId);
      loadData();
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Could not like post");
    }
  };

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId);
      loadData();
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Could not delete post");
    }
  };

  const handleFindUser = async () => {
    if (!selectedUserId.trim()) return;
    try {
      const user = await getUserById(selectedUserId.trim());
      setSelectedUser(user);
    } catch (apiError) {
      setError(apiError.response?.data?.message || "User not found");
    }
  };

  const handleFollowAction = async (action) => {
    if (!selectedUser?._id) return;

    try {
      if (action === "follow") {
        await followUser(selectedUser._id);
      } else {
        await unfollowUser(selectedUser._id);
      }
      const user = await getUserById(selectedUser._id);
      setSelectedUser(user);
      loadData();
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Could not complete follow action");
    }
  };

  return (
    <div className="container dashboard-grid">
      <section className="glass-card dashboard-panel">
        <h2>Welcome back</h2>
        <p className="muted-text">
          {profile?.name} | {profile?.college || "No college set"}
        </p>
        <p className="muted-text">
          Followers: {profile?.followers?.length || 0} | Following: {profile?.following?.length || 0}
        </p>

        <form onSubmit={handleCreatePost} className="stack-gap">
          <textarea
            placeholder="Share an idea with your college network..."
            value={postText}
            onChange={(event) => setPostText(event.target.value)}
            rows={4}
          />
          <button className="gradient-btn" type="submit">
            Create Post
          </button>
        </form>
      </section>

      <section className="glass-card dashboard-panel">
        <h3>Find and Follow User</h3>
        <p className="muted-text">Enter a user id from MongoDB to follow/unfollow quickly.</p>
        <div className="row-gap">
          <input
            type="text"
            placeholder="Paste user id"
            value={selectedUserId}
            onChange={(event) => setSelectedUserId(event.target.value)}
          />
          <button className="outline-btn" onClick={handleFindUser}>
            Find User
          </button>
        </div>

        {selectedUser && (
          <div className="glass-subcard">
            <h4>{selectedUser.name}</h4>
            <p className="muted-text">{selectedUser.college || "No college set"}</p>
            <p className="muted-text">
              Followers: {selectedUser.followers?.length || 0} | Following:{" "}
              {selectedUser.following?.length || 0}
            </p>
            <div className="row-gap">
              <button className="gradient-btn small-btn" onClick={() => handleFollowAction("follow")}>
                Follow
              </button>
              <button className="outline-btn small-btn" onClick={() => handleFollowAction("unfollow")}>
                Unfollow
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="post-feed">
        {error && <p className="error-text">{error}</p>}
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            currentUserId={profile?._id}
            onLike={handleLike}
            onDelete={handleDelete}
          />
        ))}
      </section>
    </div>
  );
};

export default DashboardPage;
