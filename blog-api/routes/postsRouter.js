import express from 'express';
const router = express.Router();

import { getPosts } from '../controllers/postsController.js';

router.route('/').get(getPosts);

export default router;