import { Router } from 'express';
import UserRouter from '../controllers/Users';
import AuthRouter from '../controllers/Auth';
import VideoRoutes from '../controllers/videos'
import ContentRoutes from '../controllers/content'
import StoreRoutes from '../controllers/products'
import PremiumContent from '../controllers/premiumContent'
import PremiumVideo from '../controllers/premiumVideos'
import Reviews from "../controllers/contentReviews";
import Orders from "../controllers/orders";
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

// Export the base-router
export default router;
