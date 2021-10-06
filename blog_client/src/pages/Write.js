import React , { useContext }from "react";
import { useForm } from "react-hook-form";
import { createPost } from "../helpers/apiCalls";
import { UserContext } from "../context/UserProvider";
import { PostsContext } from "../context/PostsProvider";
// import { ToastContainer, toast } from 'react-toastify';
import toast from 'react-hot-toast';


const Write = () => {
  const { user } = useContext(UserContext);
  const { posts, setPosts } = useContext(PostsContext);
  // console.log(user)

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const file = data.image[0]
      const convertedB64 = await convertBase64(file)
      data.image = convertedB64

      const helperData = { ...data, authorId: user._id };
      console.log('helperData', helperData)

      const res = await createPost(helperData);
      console.log("this is res ", res);

      if (!res.error) {
        setPosts([...posts, res.data]);

        toast("Post created successfully!");
        
        reset();

      } else {

        toast("something went wrong");
      }
    } catch (err) {
      console.log(err)
      toast(`${err.message}`)
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
  });
  }

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

        <input type='file' name="image" accept="image/png, image/jpeg, image/jpg" {...register("image")} />
        {errors.image && <span>File size max 1MB</span>}

        <input className='write-submit' type="submit" />


      </form>
    </div>
  );
};

export default Write;
