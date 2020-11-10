import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { v4 } from 'uuid';
import Comments from '../models/reviewsAndComments/comments';
import { paramMissingError } from '../shared/constants';

// Init shared
const router = Router();
const comments = new Comments();
 

/******************************************************************************
 *                      Get All article - "GET /api/article/all"
 ******************************************************************************/

router.get('/all/:id', async (req: Request, res: Response) => {

    const article = await comments.getOne(req.params.id);

    return res.status(OK).json({article});
});


router.post('/add/:id', async (req: Request, res: Response) => {
    // Check parameters

    const { comment } = req.body;
    if (!comment) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }

    interface MainArr {
        [key: string]: string | undefined
      }
      

    let newComment: MainArr = {}

    

    newComment[v4()] = comment
    // Add new article
    await comments.addMore(newComment ,req.params.id);

    return res.status(CREATED).end();
});


export default router;  


