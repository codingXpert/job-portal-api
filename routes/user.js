import express from 'express';
import { registerController } from '../controllers/authController.js';
import { loginController } from '../controllers/authController.js';
import { updateUserController } from '../controllers/authController.js';
import userAuth from '../middlewares/authMiddleware.js';
import { rateLimit } from 'express-rate-limit'
const router = express.Router();

const limiter = rateLimit({ // applies access limit to any route/API
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	// store: ... , // Use an external store for more precise rate limiting
})


router.post('/register', limiter, registerController);
router.post('/login', limiter, loginController);
router.put('/update', userAuth, updateUserController);

export default router