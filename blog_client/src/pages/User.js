import React, { useEffect, useContext, useState } from "react";
import UserInfo from "../components/UserInfo";
import UserPosts from "../components/UserPosts";
import axios from "axios";
import { UserContext } from "../context/UserProvider";

const User = () => {
  const [userPots, setUserPosts] = useState([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    try {
      const fetchPosts = async () => {
        const res = await axios.get(
          `http://localhost:5000/users/${user._id}/posts`
        );
        setUserPosts(res.data);
      };
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  }, [user._id]);

  return (
    <div className="page-wrapper">
      <div className="user">
        <h2>My blog posts</h2>
        { userPots.map((post)=>{
            return <UserPosts key={post._id} post={post}/>

        }) }
      </div>
      <UserInfo />
    </div>
  );
};

export default User;
