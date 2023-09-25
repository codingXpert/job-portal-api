import express from 'express';
import { registerController } from '../controllers/authController.js';
import { loginController } from '../controllers/authController.js';
import { updateUserController } from '../controllers/authController.js';
import userAuth from '../middlewares/authMiddleware.js';
const router = express.Router();


router.post('/register', registerController);
router.post('/login', loginController);
router.put('/update', userAuth, updateUserController);

export default router