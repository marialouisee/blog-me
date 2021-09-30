import express from 'express';
import {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
  getPopulatedComments
} from '../controllers/commentsController.js';

// import auth from '../middleware/authentication/authentication.js'

const router = express.Router()

router.route('/').post( createComment).get(getAllComments)
router.route('/posts').get(getPopulatedComments)
// routes with params go last
router.route('/:id').get(getCommentById).put( updateComment).delete( deleteComment)

export default router;