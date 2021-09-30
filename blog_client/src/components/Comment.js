import React from 'react'

const Comment = ({ comment, index = 0 }) => {
    return (
        <div key={comment._id} className="comment-card">
      <div className="avatar">
        <img alt="avatar" src={`https://source.unsplash.com/50x50/?avatar,${index}`} />
        <div className="author">
          { comment.author.username }
        </div>
      </div>
      <div className="body">
        
        <div className="date">
          { comment.createdAt.substring(0,10) }
        </div>
        <div className="text">
          { comment.text }
        </div>
      </div>
    </div>
    )
}

export default Comment
