import React , { useState, useEffect } from 'react'
import IconLike from '../images/thumbs-up.svg'
import IconDislike from '../images/thumbs-down.svg'
import Comment from '../components/Comment';
import { getComments } from "../helpers/apiCalls";

const PostView = ({ location }) => {

  const [comments, setComments] = useState([]);

  // renaiming the location.state to post
  const { state: post } = location;

  // get comments from API
  useEffect(() => {
    const fetchComments = async () => {
      const res = await getComments(post._id)
      console.log(res.data)
      setComments(res.data);
    };
     fetchComments();
  }, []);

  console.log(comments)

  return (
    <div className="post-view">
      <div className="post-image">
        <img alt="" src={post.image} onError={(e)=> {return (e.target.parentNode.style.dispay = 'none')}} />
      </div>
      <div className="post-details">
        <h2>{post.title}</h2>
        <div className="post-author">By: {post.authorId.username}</div>
        <div className="post-date">{post.createdAt.substring(0, 10)}</div>
        <div className="post-text">{post.text}</div>
      </div>
      {post.stats && (
        <div className="stats">
          <span>
            <img src={IconLike} alt="like" />
            {post.stats.likes}
          </span>
          <span>
            <img src={IconDislike} alt="diss" />
            {post.stats.dislikes}{" "}
          </span>
        </div>
      )}
      <div className="comments-count">{comments.length} Comments</div>
      <div className="comments">
        {comments.map((comment, i) => (
          <Comment key={comment._id} comment={comment} index={i} />
        ))}
      </div>
    </div>
  );
};

export default PostView
