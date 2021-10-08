import { createContext, useState, useEffect } from "react";
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


  const sharedData = {
    posts,
    setPosts
  };

  return (
    <PostsContext.Provider value={sharedData}>
        {children}
    </PostsContext.Provider>
  );
}
  
  export default PostsProvider;
  