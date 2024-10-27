import express from 'express';
import  signup, { getAllAuthors, getMyProfile, login, logout } from '../controllers/userController.js';
import { isAuntheticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login',login);
router.get('/logout', isAuntheticated,logout);
router.get('/myprofile', isAuntheticated, getMyProfile);
router.get('/authors',getAllAuthors);

export default router;