import express from 'express';
import importJSON from '../uploadData/dataUpload.js';

const router = express.Router();

router.post('/json', importJSON);

export default router