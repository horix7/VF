import { Request, Response, NextFunction } from 'express';
import { UNAUTHORIZED } from 'http-status-codes';
import { cookieProps } from '../shared/constants';

import { UserRoles } from '../entities/User';
import { JwtService } from '../shared/JwtService';
import BackendUser from '../models/User/User.model'

const newUser = new BackendUser()


const jwtService = new JwtService();


// Middleware to verify if user is an admin
export const adminMW = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get json-web-token
        const authToken = req.headers["authorization"];
       

        if (!authToken) {
            throw Error('JWT not present in signed cookie.');
        }
        // Make sure user role is an admin
        const clientData = await jwtService.decodeJwt(authToken);
        
        if (clientData.role === UserRoles.Admin) {
            res.locals.userId = clientData.id;
            next();
        } else {
            throw Error('JWT not present in signed cookie.');
        }
    } catch (err) {
        return res.status(UNAUTHORIZED).json({
            error: err.message,
        });

        

    }
};


// Middleware to verify if user is an admin
export const standard = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // Get json-web-token
        const authToken = req.headers["authorization"];

        if (!authToken) {
            throw Error('JWT not present in signed cookie.');
        }
        // Make sure user role is an admin
        const clientData = await jwtService.decodeJwt(authToken);

        

        if (clientData.role >= UserRoles.Standard) {
            res.locals.userId = clientData.id;
            next();
        } else {
            throw Error('JWT not present in signed cookie.');
        }
    } catch (err) {
        return res.status(UNAUTHORIZED).json({
            error: err.message,
        });

        
    }
};


// Middleware to verify if user is a premium subscriber
export const premium = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // Get json-web-token
        const authToken = req.headers["authorization"];

        if (!authToken) {
            throw Error('JWT not present in signed cookie.');
        }
        // Make sure user role is an admin

        const clientData = await jwtService.decodeJwt(authToken);        

        if (clientData.role >= UserRoles.Premium) {
            
            const userData = await newUser.getOneId(clientData.id.toString())

        if(userData.data.role === UserRoles.Premium || userData.data === UserRoles.Upgraded ) {
           if ( userData.data.iat >= Date.now()) {
            res.locals.userId = clientData.id;
            next();
           } else {
            throw Error('Your Subscrition Is Over ');
           }
        } else {
            res.locals.userId = clientData.id;
            next();
        }
           
        } else {
            throw Error('JWT not present in signed cookie.');
        }
    } catch (err) {
        return res.status(UNAUTHORIZED).json({
            error: err.message,
        });

        
    }
};
