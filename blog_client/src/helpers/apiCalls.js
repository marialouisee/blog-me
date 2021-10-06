import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

export const getPosts = async () => {
  try {
    const res = axios.get("/posts");
    return res;
  } catch (err) {
    return err
  }
};

export const createPost = async (data) => {
  console.log("this is data", data);

  try {
    const res = await axios.post(`/users/${data.authorId}/posts`, data);
    console.log('res in create post')
    return res;
  } catch (err) {
    return err
  }
};

export const loginUser = async (data) => {
  try {
    const res = await axios.post("/users/login", data);
    return res;
  } catch (err) {
    return err;
  }
};

export const registerUser = async (data) => {
  try {
    const res = await axios.post("/users/register", data);
    return res;
  } catch (err) {
    return err;
  }
};

export const getSingleUserPosts = async (id) => {
  try {
    const res = await axios.get(`/users/${id}/posts`);
    return res;
  } catch (err) {
    return err;
  }
};

export const getComments = async (id) => {
  try {
    const res = await axios.get(`/posts/${id}/comments`);
    return res;
  } catch (err) {
    return err;
  }
};


export const authCheck = async () => {
  try {
    const res = await axios.post("/users/auth");
    console.log("res authCheck", res)
    return res;
  } catch (err) {
    return err;
  }
}

export const logoutUser = async () => {
  try {
    const res = await axios.post("/users/logout");
    return res;
  } catch (err) {
    return err;
  }
}