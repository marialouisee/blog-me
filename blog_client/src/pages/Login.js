import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast'; 

const Login = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/login", data);
    //   console.log("res data", res.data);
      history.push("/posts");
    } catch (error) {
      reset()
      toast("login has failed");
    }
  };

  return (
    <div className='page-wrapper'>
      <form onSubmit={handleSubmit(onSubmit)} className='form'>
        <h2>Login</h2>
        <p>Please logg in to create posts and write comments</p>
        <input placeholder='Username' {...register("username", { required: true })} />
        {errors.username && <span>Username is required</span>}

        <input placeholder='Username' type='password' {...register("password", { required: true })} />
        {errors.password && <span>Password is required</span>}

        <input type="submit" />
      </form>
    </div>
  );
};

export default Login;
