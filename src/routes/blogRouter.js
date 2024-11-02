import express from 'express';
import { blogPost, deleteBlog, getallBlogs, getMyBlog, getSingleBlog } from '../controllers/blogController.js';
import { isAuntheticated, isAuthorized } from '../middlewares/auth.js';
import CustomError from '../middlewares/customerror.js';

const router = express.Router();

 router.post('/post', isAuntheticated, isAuthorized("Author"), blogPost);
// router.post('/post', blogPost);

router.delete('/delete/:id', isAuntheticated, isAuthorized("Author"), deleteBlog);
// router.delete('/delete/:id', isAuthorized("Author"), deleteBlog);

router.get('/all', getallBlogs);
router.get('/singleblog/:id', getSingleBlog);
router.get('/myblog', isAuntheticated, isAuthorized("Author"), getMyBlog);
// router.get('/myblog', isAuthorized("Author"), getMyBlog);



export default router;