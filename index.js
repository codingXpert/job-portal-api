//packages import
import dotenv from 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

//file import
import db from './config/mongoose.js';

const app = express();
const port = process.env.port || 5000;
db();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));  // will log the current route and time taken by it to execute in terminal

app.listen(port, (err) => {
    if(err) {
        console.log('Error while running the server', err);
    }else {
        console.log(`Server is running on port ${port}`);
    }
});