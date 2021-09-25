import React, { useContext } from 'react'
import { PostsContext } from '../context/PostsProvider'
import Post from '../components/Posts'

const PostList = () => {
  const { posts } = useContext(PostsContext);

  return (
    <div className='page-wrapper'>
      <div className="posts-list">
        {posts.map((post, i) => (
          <Post key={post._id} post={post} index={i} />
        ))}
      </div>
    </div>
  );
};

export default PostList
