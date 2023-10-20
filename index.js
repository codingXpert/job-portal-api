//packages import
import dotenv from 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

//security packages
import helmet from 'helmet';
import xss_clean from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize'

//file import
import db from './config/mongoose.js';
import routes from './routes/index.js';
import customError from './middlewares/customError.js';

//rest object
const app = express();

const port = process.env.port || 5000;
db();

//middlewares
app.use(helmet()); // secure our header section
app.use(xss_clean()); // checks and sanitize the input coming from POST, GET, params
app.use(mongoSanitize()); // middleware which sanitizes user-supplied data to prevent MongoDB Operator Injection from(req.body, req.query or req.params).
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));  // will log the current route and time taken by it to execute in terminal
app.use('/api/v1', routes);

//validation middleware
app.use(customError);

app.listen(port, (err) => {
    if(err) {
        console.log('Error while running the server', err);
    }else {
        console.log(`Server is running on port ${port}`);
    }
});