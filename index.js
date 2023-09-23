import dotenv from 'dotenv/config';
import express from 'express';

const app = express();
const port = process.env.port || 5000;

app.listen(port, (err) => {
    if(err) {
        console.log('Error while running the server', err);
    }else {
        console.log(`Server is running on port ${port}`);
    }
});