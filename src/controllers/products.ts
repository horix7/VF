import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import Store from '../models/store/Store.model';
import { paramMissingError } from '@shared/constants';
import { store_owner } from '../middleware/middleware';
import { v4 } from 'uuid';

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


/******************************************************************************
 *                      search products - "GET /api/products/all"
 ******************************************************************************/

router.get('/some/:name', async (req: Request, res: Response) => {
    const { name } = req.params as ParamsDictionary;

    const products = await store.getSome(name);

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

router.use(store_owner).post('/add', async (req: Request, res: Response) => {
    // Check parameters
    const { product } = req.body;
    if (!product) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    // Add new product
    product.review_id = v4()
    await store.add(product);
    return res.status(CREATED).end();
});


/******************************************************************************
 *                       Update - "PUT /api/products/update"
 ******************************************************************************/

router.use(store_owner).put('/update', async (req: Request, res: Response) => {
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

router.use(store_owner).delete('/delete/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;
    await store.delete(id);
    return res.status(OK).end(); 
});


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
