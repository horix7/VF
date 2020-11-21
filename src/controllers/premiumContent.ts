import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import Content from '../models/PremiumContent/condent.model';
import { paramMissingError } from '../shared/constants';
import {adminMW , premium } from '../middleware/middleware';

// Init shared
const router = Router();
const content = new Content();
 

/******************************************************************************
 *                      Get All article - "GET /api/article/all"
 ******************************************************************************/

router.use(premium).get('/all', async (req: Request, res: Response) => {
    const article = await content.getAll();

    return res.status(OK).json({article});
});


/******************************************************************************
 *                      search article - "GET /api/article/all"
 ******************************************************************************/

router.use(premium).get('/some/:name', async (req: Request, res: Response) => {
    const { name } = req.params as ParamsDictionary;

    const article = await content.getSome(name);

    return res.status(OK).json({article});

});



 router.use(premium).get('/one/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;

    const article = await content.getOne(id);
    return res.status(OK).json({article});
});


/******************************************************************************
 *                       Add One - "POST /api/article/add"
 ******************************************************************************/

router.use(adminMW).post('/add', async (req: Request, res: Response) => {
    // Check parameters
    console.log(req)
    const { article } = req.body;
    if (!article) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    // Add new article
    await content.add(article);

    return res.status(CREATED).end();
});


/******************************************************************************
 *                       Update - "PUT /api/article/update"
 ******************************************************************************/

router.use(adminMW).put('/update', async (req: Request, res: Response) => {
    // Check Parameters
    const { article } = req.body;
    if (!article) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
   
    // Update article
    await content.update(article, req.body.id);
    return res.status(OK).end();
});


/******************************************************************************
 *                    Delete - "DELETE /api/article/delete/:id"
 ******************************************************************************/

router.use(adminMW).delete('/delete/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;
    await content.delete(id);
    return res.status(OK).end(); 
});


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
