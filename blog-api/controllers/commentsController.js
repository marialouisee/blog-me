import Comment from "../models/Comment.js";

// GET
export const getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

// GET
export const getCommentById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findById(id);
    res.json(comment);
  } catch (err) {
    next(err);
  }
};

//  POST
export const createComment = async (req, res, next) => {
  try {
    const commentNew = await Comment.create(req.body);
    res.json(commentNew);
  } catch (err) {
    next(err);
  }
};

//   PUT
export const updateComment = async (req, res, next) => {
  try {
    const commentUpdated = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(commentUpdated);
  } catch (err) {
    next(err);
  }
};

//  DELETE
export const deleteComment = async (req, res, next) => {
  try {
    const commentDeleted = await Comment.findByIdAndDelete(req.params.id);
    res.json(commentDeleted);
  } catch (err) {
    next(err);
  }
};


// GET /comments/posts
export const getPopulatedComments = async (req, res, next) => {
  try {
    const comments = await Comment.find().populate("postId");
    res.json(comments);
  } catch (err) {
    next(err);
  }
};
