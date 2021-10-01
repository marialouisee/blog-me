import express from 'express';
const router = express.Router();

import {
  getUser, 
  getUsers, 
  addUser, 
  updateUser, 
  deleteUser, 
  loginUser,
  logoutUser,
  authUser
} from '../controllers/usersController.js';

import {
  getSingleUserPosts,
  createPost, 
  deletePost, 
  updatePost, 
} from '../controllers/postsController.js';

import {
  userValidationRules,
  userValidationErrorHandling
} from '../validation/userValidation.js'

import auth from '../middleware/authentication/authentication.js'

router.route("/").get( getUsers);

router.route("/register").post(
  userValidationRules(), // Validate user input
  userValidationErrorHandling, // this is a middleware
  addUser
);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

router.route('/auth').post(auth, authUser)

router.route("/:id").get(auth, getUser).put(auth, updateUser).delete(auth, deleteUser);

router.route("/:id/posts").get(auth, getSingleUserPosts).post(auth, createPost);
router.route("/:id/posts/:postId").delete(auth, deletePost).put(auth, updatePost);

export default router;
