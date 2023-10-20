import express from 'express';
import User from '../routes/user.js';
import Job from '../routes/job.js';
import Upload from './upload.js';
const router = express.Router();

router.use('/user', User);
router.use('/job', Job);
router.use('/upload', Upload);


export default router