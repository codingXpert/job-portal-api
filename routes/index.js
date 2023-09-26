import express from 'express';
import User from '../routes/user.js';
import Job from '../routes/job.js';
const router = express.Router();

router.use('/user', User);
router.use('/job', Job);


export default router