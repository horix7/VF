import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';

import express, { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status-codes';
import 'express-async-errors';

import BaseRouter from './routes';
import cors from 'cors'
import logger from './shared/Logger';
import cookieParser from 'cookie-parser'
import {cookieProps} from './shared/constants'
 
// import bodyParser  from ''

// Init express
const app = express();



app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(cookieProps.secret));
app.use(cors({
    origin: "https://vfitness-8a2c3.web.app",
    credentials: true    
}))

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





// Export express instance
export default app;
