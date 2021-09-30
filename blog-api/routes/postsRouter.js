import express from 'express';
const router = express.Router();

import { getPosts, getCommentsByPostId } from '../controllers/postsController.js';

router.route('/').get(getPosts);
router.route('/:id/comments').get(getCommentsByPostId)

export default router;