import React, { useContext, useState } from "react";
import { PostsContext } from "../context/PostsProvider";
import { deletePost, updatePost } from "../helpers/apiCalls";
import { useParams } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';



const UserPosts = ({ post }) => {
  const { id } = useParams();
  const { posts, setPosts } = useContext(PostsContext);
  const [edit, setEdit] = useState(false);

  // DELETE POST
  const onClickDelete = async (postId) => {
    const res = await deletePost(id, postId);

    if (!res.error) {
      setPosts(posts.filter((post) => post._id !== postId));
    }
  };

  // UPDATE POST

  // this will enable edit mode
  const handleEdit = () => {
    setEdit(true);
  };

  const [updateData, setUpdateData] = useState({
    title: post.title,
    text: post.text,
  });

  const handleChange = (e) => {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
    console.log(updateData);
  };

  const handleUpdate = async (e, postId) => {
    if (e.target.value === "save") {
      const res = await updatePost(id, postId, updateData);
      console.log(res);
      const copy = posts.map((item) => (item._id === res._id ? res : item));

      setPosts(copy);

      setEdit(false);
    } else {
      setEdit(false);
    }
  };

  // const onClickUpdate = (postId) =>{
  //   let newEditPost = posts.find((post) => post._id === postId);
  //   console.log(newEditPost)
  // }

  return (
    <div key={post._id} className="user-post-card" id={post._id}>
      <div className="user-post-image">
        <img
          alt=""
          src={post.imageUrl}
          onError={(e) => {
            return (e.target.parentNode.style.dispay = "none");
          }}
        />
      </div>

      {edit ? null : (
        <>
          <button
            className="user-post-button"
            onClick={() => onClickDelete(post._id)}
          >
            <AiFillDelete/>
          </button>
          <button className="user-post-button" onClick={() => handleEdit()}>
            <AiFillEdit/>
          </button>
        </>
      )}

      <div className="user-post-title">
        {edit ? (
          <input
            type="text"
            name="title"
            id={post._id}
            placeholder={post.title}
            value={updateData.title}
            onChange={handleChange}
          />
        ) : (
          post.title
        )}
      </div>

      {edit? null : <div className="user-post-author">{post.createdAt?.substring(0, 10)}</div>}

      {edit ? (
        <textarea
          type="textarea"
          name="text"
          id={post._id}
          placeholder={post.text}
          value={updateData.text}
          onChange={handleChange}
        />
      ) : (
        <div className="user-post-text">{post.text}</div>
      )}

      {edit ? (
        <div>
          <button 
            className="user-post-button"
            onClick={(e) => handleUpdate(e, post._id)}
            value={"save"}
          >
            Save Changes
          </button>
          <button
            className="user-post-button"
            onClick={(e) => handleUpdate(e, post._id)}
            value={"cancel"}
          >
            Cancel Changes
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default UserPosts;
