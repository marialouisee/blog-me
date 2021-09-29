import express from 'express';
const router = express.Router();

import {
  getUser, // protect, user
  getUsers, // protect, admin
  addUser, 
  updateUser, // protect, user/admin
  deleteUser, // protect, user/admin
  loginUser
} from '../controllers/usersController.js';

import {
  getSingleUserPosts,
  createPost, // protect, user
  deletePost, // protect, user
  updatePost, // protect, user
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

router.route('/:id/posts').get(getSingleUserPosts).post(createPost);
router.route('/:id/posts/:postId').delete(deletePost).put(updatePost);

export default router;
