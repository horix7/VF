import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import http from 'http'
import express, { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status-codes';
import 'express-async-errors';
import BaseRouter from './routes';
import logger from './shared/Logger';
import cookieParser from 'cookie-parser'
import {cookieProps} from './shared/constants'
 

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(cookieProps.secret));

app.use((req, res, next) => {
    const allowedOrigins = [ 'http://localhost:3001' , "https://vfitness-8a2c3.web.app", 'http://localhost:3000'];
    const origin = req.headers.origin || "null";
    if (allowedOrigins.includes(origin.toString())) {
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', "true");

    if (req.method === "OPTIONS" ){
        res.status(200).end()
        return
    }

    return next();
  });




if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// // Security
// if (process.env.NODE_ENV === 'production') {
//     app.use(helmet());
// }


// Add APIs
app.use('/api', BaseRouter);

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});



export default app;
