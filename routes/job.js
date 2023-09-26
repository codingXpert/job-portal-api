import express from 'express';
import { createJobController } from '../controllers/jobController.js';
import { getAllJobsController } from '../controllers/jobController.js';
import userAuth from '../middlewares/authMiddleware.js';
const router = express.Router();

    
router.post('/create', userAuth, createJobController);
router.get('/get', userAuth, getAllJobsController);

export default router