import express from 'express';
import { blogPost } from '../controllers/blogController.js';
import { isAuntheticated, isAuthorized } from '../middlewares/auth.js';

const router = express.Router();

router.post('/post', isAuntheticated, isAuthorized("Author"), blogPost);

export default router;