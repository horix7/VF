import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import Store from '../models/store/checkout.model';
import { paramMissingError } from '../shared/constants';

// Init shared
const router = Router();
const store = new Store();
 

/******************************************************************************
 *                      Get All products - "GET /api/products/all"
 ******************************************************************************/
router.get('/all', async (req: Request, res: Response) => {
    const products = await store.getAll();
    return res.status(OK).json({products});
});




 router.get('/one/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;

    const products = await store.getOne(id);
    return res.status(OK).json({products});
});


/******************************************************************************
 *                       Add One - "POST /api/products/add"
 ******************************************************************************/

router.post('/add', async (req: Request, res: Response) => {
    // Check parameters
    const product  = req.body;
    if (!product) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }

    await store.add(product);
    return res.status(CREATED).end();
});


/******************************************************************************
 *                       Update - "PUT /api/products/update"
 ******************************************************************************/

router.put('/update', async (req: Request, res: Response) => {
    // Check Parameters
    const { product } = req.body;
    if (!product) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
   
    // Update product
    await store.update(product, req.body.id);
    return res.status(OK).end();
});


/******************************************************************************
 *                    Delete - "DELETE /api/products/delete/:id"
 ******************************************************************************/

router.delete('/delete/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;
    await store.delete(id);
    return res.status(OK).end(); 
});




/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
