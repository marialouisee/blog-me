import React from 'react'
import { Link } from 'react-router-dom'

const Posts = ({ post, index = 0 }) => {

  // this sends "like props" post state to PostView
  const postLinkData = {
    pathname: `/posts/${post._id}`,
    state: post 
  } 
  return (
    <div key={post._id} className="post-card">
      <div className="post-image">
        <img
          alt="avatar"
          src={`https://source.unsplash.com/150x150/?nature,${index}`}
        />
      </div>
      <div className="post-title">
        <Link to={postLinkData}>{post.title}</Link>
      </div>
      <div className="post-author">
        {post.createdAt.substring(0, 10)} by {post.author}
      </div>
      <div className="post-text">{post.text.substring(0, 70)}</div>
      <div className="post-foloowup">
        <Link to={postLinkData}>Read more...</Link>
      </div>
    </div>
  );
}

export default Posts
