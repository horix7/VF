import { Router } from 'express';
import UserRouter from '../controllers/Users';
import AuthRouter from '../controllers/Auth';
import VideoRoutes from '../controllers/videos'
import ContentRoutes from '../controllers/content'
import StoreRoutes from '../controllers/products'

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/auth', AuthRouter);
router.use('/products', StoreRoutes);
router.use('/content', ContentRoutes);
router.use('/videos', VideoRoutes);

// Export the base-router
export default router;
