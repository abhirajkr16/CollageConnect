const PostCard = ({ post, currentUserId, onLike, onDelete }) => {
  const isOwner = post.author?._id === currentUserId;

  return (
    <article className="glass-card post-card">
      <div className="post-header">
        <div>
          <h4>{post.author?.name || "Unknown User"}</h4>
          <p className="muted-text">{new Date(post.createdAt).toLocaleString()}</p>
        </div>
      </div>

      <p className="post-text">{post.text}</p>

      <div className="post-actions">
        <button className="outline-btn small-btn" onClick={() => onLike(post._id)}>
          Like ({post.likes?.length || 0})
        </button>
        {isOwner && (
          <button className="danger-btn small-btn" onClick={() => onDelete(post._id)}>
            Delete
          </button>
        )}
      </div>
    </article>
  );
};

export default PostCard;
