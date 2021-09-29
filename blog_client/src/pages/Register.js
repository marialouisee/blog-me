import React from 'react'
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast'; 
import { registerUser } from "../helpers/apiCalls"; 


const Register = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data);
      history.push("/login");
      toast("Wonderful. Please logg in now");
    } catch (error) {
      toast("Register has failed");
    }
  };

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

        <input placeholder="Optional Avatar Url" {...register("avatar")} />
        

        <input type="submit" />
      </form>
    </div>
  );
}

export default Register
