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
    return res;
  } catch (err) {
    return err;
  }
};

export const deletePost = async (userId, postId) => {
  console.log("this is deletePost", userId, postId);

  try {
    const res = await axios.delete(`/users/${userId}/posts/${postId}`);
    return res;
  } catch (err) {
    return err;
  }
};

export const updatePost = async (userId, postId, data) => {
  console.log(userId)
  console.log(postId)
  console.log(data)

  try {
    const res = await axios.put(`/users/${userId}/posts/${postId}`, data);
    return res;
  } catch (err) {
    return err;
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