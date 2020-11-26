import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import Videos from '../models/premiumVidz/video.model';
import { paramMissingError } from '../shared/constants';
import { adminMW, premium } from '../middleware/middleware';

// Init shared
const router = Router()
const videos = new Videos();
 


router.use(premium).get('/all', async (req: Request, res: Response) => {
    const video = await videos.getAll();
    
    return res.status(OK).json({video});
});



router.use(premium).get('/some/:name', async (req: Request, res: Response) => {
    const { name } = req.params as ParamsDictionary;

    const video = await videos.getSome(name);

    return res.status(OK).json({video});

});



 router.use(premium).get('/one/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;

    const video = await videos.getOne(id);
    return res.status(OK).json({video});
});


/******************************************************************************
 *                       Add One - "POST /api/video/add"
 ******************************************************************************/

router.use(adminMW).post('/add', async (req: Request, res: Response) => {
    // Check parameters
    const { video } = req.body;
    if (!video) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    // Add new video
    await videos.add(video);
    return res.status(CREATED).end();
});


/******************************************************************************
 *                       Update - "PUT /api/video/update"
 ******************************************************************************/

router.use(adminMW).put('/update', async (req: Request, res: Response) => {
    // Check Parameters
    const { video } = req.body;
    if (!video) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
   
    // Update video
    await videos.update(video, req.body.id);
    return res.status(OK).end();
});


/******************************************************************************
 *                    Delete - "DELETE /api/video/delete/:id"
 ******************************************************************************/

router.use(adminMW).delete('/delete/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;
    await videos.delete(id);
    return res.status(OK).end(); 
});


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
