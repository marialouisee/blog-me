import express from 'express';
import {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
  getPopulatedComments
} from '../controllers/commentsController.js';

import auth from '../middleware/authentication/authentication.js'

const router = express.Router()

router.route('/').post(auth, createComment).get(getAllComments)
router.route('/posts').get(getPopulatedComments)
// routes with params go last
router.route('/:id').get(getCommentById).put(auth, updateComment).delete(auth, deleteComment)

export default router;