import React, {useContext} from 'react'
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast'; 
import { registerUser } from "../helpers/apiCalls"; 
import { UserContext } from "../context/UserProvider";


const Register = () => {
  const history = useHistory();
  const { setUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const file = data.avatar[0]
      // console.log(file)
      const convertedB64 = await convertBase64(file)
      // console.log('convertedB64', convertedB64)
      data.avatar = convertedB64
      // console.log('data.avatar', data.avatar)

      const res = await registerUser(data);
      history.push(`/`);
      setUser(res.data);
      toast("you are logged in");

    } catch (error) {
      toast("Register has failed");
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
    <div className='page-wrapper'>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h2>Register</h2>
          <p>Please fill in this form to create an account.</p>
          <p>With your brand new account you will be ready to create posts and write comments</p>
        <input placeholder="Username" {...register("username", { required: true })} />
        {errors.username && <span>Username is required</span>}

        <input placeholder="Email" {...register("email", { required: true })} />
        {errors.email && <span>Email is required</span>}

        <input type='password' placeholder="Password" {...register("password", { required: true })} />
        {errors.password && <span>Password is required</span>}

        {/* needs a custom fil upload button */}
        <input type='file' name="avatar" accept="image/png, image/jpeg, image/jpg" {...register("avatar")} />
        {errors.avatar && <span>File size max 1MB</span>}

        <input className='submit' type="submit" />
      </form>
    </div>
  );
}

export default Register
