import express from 'express';
import  signup, { getMyProfile, login, logout } from '../controllers/userController.js';
import { isAuntheticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login',login);
router.get('/logout',logout);
router.get('/myprofile', isAuntheticated, getMyProfile);

export default router;