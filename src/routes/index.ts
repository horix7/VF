import { Request, Response, Router } from 'express';
import UserRouter from '../controllers/Users';
import AuthRouter from '../controllers/Auth';
import VideoRoutes from '../controllers/videos'
import ContentRoutes from '../controllers/content'
import StoreRoutes from '../controllers/products'
import PremiumContent from '../controllers/premiumContent'
import PremiumVideo from '../controllers/premiumVideos'
import Reviews from "../controllers/contentReviews";
import Orders from "../controllers/orders";
import axios from "axios"
import { OK } from 'http-status-codes';
// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/auth', AuthRouter);
router.use('/products', StoreRoutes);
router.use('/reviews', Reviews);
router.use('/orders', Orders);
router.use('/fremium/content', ContentRoutes);
router.use('/videos', VideoRoutes);
router.use('/premium/content', PremiumContent);
router.use('/premium/videos', PremiumVideo);

router.get("/payment/:id" , async (req: Request, res: Response) => {

    let link = "https://payments-api.fdibiz.com/v2/momo/trx/" + req.params.id + "/info"
   
        const result = await axios({
            method: "post",
            url: "https://payments-api.fdibiz.com/v2/auth",
            data: {
                "AppId": "6f5b098a-d46c-403c-b596-14181a054a87",
                "Secret": "56462810-be19-461f-abdc-037be2c7cc40"
            }
        });

        const getStatus = await  axios({
            method: 'get',
            url: link,
            headers: { "Authorization": `Bearer ${result.data.data.token}` }
        })

        return res.status(OK).json({
            token: getStatus.data.data.trxStatus 
        }).end();
    })

   router.post( "/payment",  async (req: Request, res: Response) => {
        const result = await axios({
            method: "post",
            url: "https://payments-api.fdibiz.com/v2/auth",
            data: {
                "AppId": "6f5b098a-d46c-403c-b596-14181a054a87",
                "Secret": "56462810-be19-461f-abdc-037be2c7cc40"
            }
        });

        const paymentPost = await  axios({
            method: 'post',
            url: "https://payments-api.fdibiz.com/v2/momo/pull",
            data: req.body,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${result.data.data.token}`

            }
        }) 

        return res.status(OK).json({
            data: paymentPost.data.data
        }).end()
    })

// Export the base-router
export default router;
