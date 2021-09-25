import React from 'react'

const Posts = ({ post }) => {

  return (
    <div key={post._id} className="user-post-card">
      <div className="user-post-image">
        <img
          alt=""
          src={post.imageUrl}
          onError={(e) => {
            return (e.target.parentNode.style.dispay = "none");
          }}
        />
      </div>
      <div className="user-post-title">{post.title}</div>
      <div className="user-post-author">{post.createdAt?.substring(0, 10)}</div>
      <div className="user-post-text">{post.text}</div>
    </div>
  );
}

export default Posts
