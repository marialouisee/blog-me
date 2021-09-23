import React, { useContext } from 'react'
import { PostsContext } from '../context/PostsProvider'
import Post from '../components/Posts'

const PostList = () => {
    const { posts } = useContext(PostsContext)

    const jsxPosts = posts.map((post, i) => (
        <Post key={post._id} post={post} index={i} />
      ))

    return (
        <div className="posts">
            { jsxPosts }
        </div>
    )
}

export default PostList
