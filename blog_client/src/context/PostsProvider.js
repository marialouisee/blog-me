import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { getPosts } from "../helpers/apiCalls";

export const PostsContext = createContext();


function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      const fetchPosts = async () => {
        const res = await getPosts()
        setPosts(res.data);
      };
      fetchPosts();
    } catch (err) {
      console.log(err.message);
    }
  }, []);



  // const addPost = (postNew) => {
  //   setPosts([...posts, postNew]);
  // };
  // const updatePost = (postUpdated) => {
  //   setPosts(
  //     posts.map((post) =>
  //       post._id === postUpdated._id ? { ...postUpdated } : post
  //     )
  //   );
  // };
  // const deletePost = (postToDelete) => {
  //   setPosts(posts.filter((post) => post._id !== postToDelete._id));
  // };

  const sharedData = {
    posts,
    setPosts,
    // addPost,
    // updatePost,
    // deletePost
  };

  return (
    <PostsContext.Provider value={sharedData}>
        {children}
    </PostsContext.Provider>
  );
}
  
  export default PostsProvider;
  