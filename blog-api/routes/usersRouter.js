import express from 'express';
const router = express.Router();

import {
  getUser,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  loginUser
} from '../controllers/usersController.js';

import {
  getPosts,
  createPost,
  deletePost,
  updatePost,
  getPost,
} from '../controllers/postsController.js';

import {
  userValidationRules,
  userValidationErrorHandling
} from '../validation/userValidation.js'

router.route("/").get(getUsers)
                 .post(userValidationRules(), // Validate user input
                       userValidationErrorHandling, // this is a middleware
                       addUser);

router.route("/login").post(loginUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

router.route('/:id/posts').get(getPosts).post(createPost);
router.route('/:id/posts/:postId').delete(deletePost).put(updatePost).get(getPost);

export default router;
