import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import { hashRounds } from '../shared/constants'
import UserDao from '../models/User/User.model';
import { paramMissingError } from '@shared/constants';
import { adminMW } from '../middleware/middleware';
import { UserRoles } from '@entities/User';
import bcrypt from 'bcrypt'

// Init shared
const router = Router().use(adminMW);
const userDao = new UserDao();
 

/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************/

router.get('/all', async (req: Request, res: Response) => {
    const users = await userDao.getAll();
    return res.status(OK).json({users});
});


/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/

router.post('/add', async (req: Request, res: Response) => {
    // Check parameters
    const { user } = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    // Add new user
    user.role = UserRoles.Standard;
    await userDao.add(user);
    return res.status(CREATED).end();
});


/******************************************************************************
 *                       Update - "PUT /api/users/update"
 ******************************************************************************/

router.put('/update', async (req: Request, res: Response) => {
    // Check Parameters
    const { user } = req.body;
    const newuser = {...user}
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    if(user.password) {
        newuser["pwdHash"] = bcrypt.hashSync(user.password , hashRounds)
        delete newuser.password
    }
    // Update user
    console.log(newuser)
    await userDao.update(newuser, req.body.id);
    return res.status(OK).end();
});


/******************************************************************************
 *                    Delete - "DELETE /api/users/delete/:id"
 ******************************************************************************/

router.delete('/delete/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;
    await userDao.delete(id);
    return res.status(OK).end(); 
});


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
