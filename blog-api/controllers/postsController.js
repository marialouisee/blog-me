import Post from "../models/Post.js";
import createError from "http-errors";
import Comment from "../models/Comment.js";

//# POST ROUTE

// get all posts
export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate({ path: "authorId", select: "username" }); //just populate username for frontend
    res.json(posts);
  } catch (error) {
    next(error);
  }
};


//GET /:id/comments
export const getCommentsByPostId = async (req, res, next) => {
  const { id } = req.params;
  try {

    const comments = await Comment.find({ postId: id }).populate({ path: "author", select: "username" });
    res.json(comments);
  } catch (error) {
    next(error);
  }
};



// #############################################################################
// USERS ROUTES

// user/:id/posts
export const getSingleUserPosts = async (req, res, next) => {
  const { id } = req.params;
  try {
    const posts = await Post.find({ authorId: id });
    res.json(posts);
  } catch (error) {
    next(error);
  }
}


export const createPost = async (req, res, next) => {
  const body = req.body;
  try {
    const postNew = await Post.create(body);
    if(!postNew) throw new createError(400, "Post not created");
    res.json(postNew);
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const postUpdated = await Post.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!postUpdated) throw new createError(404, "Post not found");
    res.json(postUpdated);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const postDeleted = await Post.findByIdAndDelete(id);
    res.json(postDeleted);
  } catch (error) {
    next(error);
  }
};


