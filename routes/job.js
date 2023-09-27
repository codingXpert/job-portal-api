import express from 'express';
import { 
    createJobController, 
    getAllJobsController, 
    deleteJobController, 
    updateJobController 
} from '../controllers/jobController.js';

import userAuth from '../middlewares/authMiddleware.js';
const router = express.Router();

    
router.post('/create', userAuth, createJobController);
router.get('/get', userAuth, getAllJobsController);
router.patch('/update/:id', userAuth, updateJobController);
router.delete('/delete/:id', userAuth, deleteJobController);

export default router