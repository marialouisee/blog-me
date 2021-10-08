import React from 'react'
import { Link } from 'react-router-dom'

const Posts = ({ post }) => {

  // this sends "like props" post state to PostView
  const postLinkData = {
    pathname: `/posts/${post._id}`,
    state: post 
  } 
  console.log(post)

  return (
    <div key={post._id} className="post-card">
      <div className="post-image">
        <img alt="" src={post.imageUrl} onError={(e)=> {return (e.target.parentNode.style.dispay = 'none')}} />
      </div>
      <div className="post-title">
        <Link to={postLinkData}>{post.title}</Link>
      </div>
      <div className="post-author">
        {post.createdAt?.substring(0, 10)} by {post.authorId?.username}
      </div>
      <div className="post-text">{post.text.substring(0, 70)}</div>
      <div className="post-folowup">
        <Link to={postLinkData}>Read more...</Link>
      </div>
    </div>
  );
}

export default Posts
