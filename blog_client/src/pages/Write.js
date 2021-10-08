import React , { useContext }from "react";
import { useForm } from "react-hook-form";
import { createPost } from "../helpers/apiCalls";
import { PostsContext } from "../context/PostsProvider";
// import { ToastContainer, toast } from 'react-toastify';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'


const Write = () => {
  const { id } = useParams();
  const { posts, setPosts } = useContext(PostsContext);
  // console.log(user)

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();

  const onSubmit = async (data) => {
    const helperData = { ...data, authorId: id };
    const res = await createPost(helperData);
    console.log('this is res ', res)

    if (!res.error) {
      setPosts([...posts, res.data]);
      toast("Post created successfully!", {
        duration: 4000,
        position: "top-right",
        style: {
          color: "black",
          background: "rgba(27, 95, 86, 0.842)",
        },
      });
      reset();
    } else {

        // todo handle error

        toast( 'something went wrong', {
            duration: 4000,
            position: "top-right",
            style: {
              color: "black",
            },
          });
    }
  };


  return (
    <div className="page-wrapper">
      <form className="write-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="write-title"
          placeholder="Title"
          {...register("title", {
            required: true,
            minLength: { value: 5, message: "Not Enough Characters (min 5)" },
            maxLength: { value: 80, message: "Too Many Characters (max 80)" },
          })}
        />
        {errors.title?.type === "required" && "Title is required"}
        
        <textarea
          className="write-text"
          placeholder="Your blog content"
          {...register("text", {
            required: true,
            minLength: {
              value: 0,
              message: "Not Enough Characters (min 1000)",
            },
            maxLength: {
              value: 5000,
              message: "Too Many Characters (max 5000)",
            },
          })}
        />
        {errors.text && "Text is required"}

        <input
          className="write-title"
          placeholder="Image URL"
          {...register("imageUrl", {
            required: true
          })}
        />
        {errors.title?.type === "required" && "Title is required"}

        <input className='write-submit' type="submit" />


      </form>
    </div>
  );
};

export default Write;
