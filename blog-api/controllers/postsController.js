import Post from "../models/Post.js";
// import Comment from "../models/Comment.js";

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    res.json(post);
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const postNew = await Post.create(req.body);
    res.json(postNew);
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const postUpdated = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(postUpdated);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const postDeleted = await Post.findByIdAndDelete(req.params.id);
    res.json(postDeleted);
  } catch (error) {
    next(error);
  }
};

// GET /:id/comments
// export const getCommentsByPostId = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     //! find in in Comment model
//     const comments = await Comment.find({ postId: id });
//     res.json(comments);
//   } catch (error) {
//     next(error);
//   }
// };



