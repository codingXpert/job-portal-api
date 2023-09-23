import dotenv from 'dotenv/config';
import express from 'express';
import db from './config/mongoose.js';

const app = express();
const port = process.env.port || 5000;
db();

app.listen(port, (err) => {
    if(err) {
        console.log('Error while running the server', err);
    }else {
        console.log(`Server is running on port ${port}`);
    }
});