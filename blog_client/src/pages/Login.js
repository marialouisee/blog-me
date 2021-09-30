import React , {useContext} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import {loginUser} from '../helpers/apiCalls' 
import { UserContext } from "../context/UserProvider";

const Login = () => {
  const history = useHistory();
  const { setUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data);
      console.log("res data", res.data);
      history.push(`/users/${res.data._id}`);
      setUser(res.data);
      toast("you are logged in");

      // TODO set user 
      
    } catch (err) {
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

        <input placeholder='Password' type='password' {...register("password", { required: true })} />
        {errors.password && <span>Password is required</span>}

        <input className="submit" type="submit" />
      </form>
    </div>
  );
};

export default Login;
