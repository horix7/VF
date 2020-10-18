import bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK, UNAUTHORIZED, CREATED , CONFLICT} from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid'

import UserDao from '../models/User/User.model';
import { JwtService } from '@shared/JwtService';
import { paramMissingError, loginFailedErr, cookieProps , userexists , hashRounds } from '@shared/constants';
import { UserRoles } from '@entities/User'

const router = Router();
const userDao = new UserDao();
const jwtService = new JwtService();


/******************************************************************************
 *                      register User - "POST /api/auth/signup"
 ******************************************************************************/




router.post('/signup', async (req: Request, res: Response) => {
    // Check parameters
    const { newUser } = req.body;
    if (!newUser) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }

    const user = await userDao.getOne(newUser.email);
    if (user) {
        return res.status(CONFLICT).json({
            error: userexists,
        });
    }

    // Add new user
    newUser.role = UserRoles.Standard;
    newUser.pwdHash = bcrypt.hashSync(newUser.password , hashRounds)
    newUser.id = uuidv4(newUser)

    delete newUser.password
    
    await userDao.add(newUser);

    const jwt = await jwtService.getJwt({
        id: newUser.id,
        role: newUser.role,
    });

    const { key, options } = cookieProps;
    res.cookie(key, jwt, options);
    res.header( {token: jwt})
    // Return
    return res.status(CREATED).end();

});


/******************************************************************************
 *                      Login User - "POST /api/auth/login"
 ******************************************************************************/



router.post('/login', async (req: Request, res: Response) => {
    // Check email and password present
    const { email, password } = req.body;
    if (!(email && password)) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    // Fetch user
    const user = await userDao.getOne(email);
    if (!user) {
        return res.status(UNAUTHORIZED).json({
            error: loginFailedErr,
        });
    }
    // Check password
    const pwdPassed = await bcrypt.compare(password, user.pwdHash);
    if (!pwdPassed) {
        return res.status(UNAUTHORIZED).json({
            error: loginFailedErr,
        });
    }
    // Setup Admin Cookie
    const jwt = await jwtService.getJwt({
        id: user.id,
        role: user.role,
    });
    const { key, options } = cookieProps;
    res.cookie(key, jwt, options);
    res.header( {token: jwt})
    // Return
    return res.status(OK).end();
});


/******************************************************************************
 *                      Logout - "GET /api/auth/logout"
 ******************************************************************************/

router.get('/logout', async (req: Request, res: Response) => {
    const { key, options } = cookieProps;
    res.clearCookie(key, options);
    return res.status(OK).end();
});


/******************************************************************************
 *                                 Export Router
 ******************************************************************************/

export default router;
