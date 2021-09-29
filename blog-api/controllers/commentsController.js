import Comment from "../models/Comment.js";
import createError from "http-errors";

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
    if (!comment) throw new createError(404, "Comment not found");
    res.json(comment);
  } catch (err) {
    next(err);
  }
};

//  POST
export const createComment = async (req, res, next) => {
  const body = req.body;
  try {
    const commentNew = await Comment.create(body);
    if (!commentNew) throw new createError(400, "Comment not created");
    res.json(commentNew);
  } catch (err) {
    next(err);
  }
};

//   PUT
export const updateComment = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const commentUpdated = await Comment.findByIdAndUpdate(id, body,
      { new: true }
    );
    if (!commentUpdated) throw new createError(404, "Comment not found");
    res.json(commentUpdated);
  } catch (err) {
    next(err);
  }
};

//  DELETE
export const deleteComment = async (req, res, next) => {
  const { id } = req.params;
  try {
    const commentDeleted = await Comment.findByIdAndDelete(id);
    if (!commentDeleted) throw new createError(404, "Comment not found");
    res.json(commentDeleted);
  } catch (err) {
    next(err);
  }
};


// GET /comments/posts
export const getPopulatedComments = async (req, res, next) => {
  try {
    const comments = await Comment.find().populate("postId");
    if (!comments) throw new createError(404, "Comments not found");
    res.json(comments);
  } catch (err) {
    next(err);
  }
};
