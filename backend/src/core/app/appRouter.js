import express from 'express';
import authRoutes from '../../entities/auth/auth.routes.js';
import userRoutes from '../../entities/user/user.routes.js';
import postRoutes from '../../entities/post/post.routes.js';
import commentRoutes from '../../entities/comments/comment.routes.js';
import notificationRoutes from '../../entities/notification/notification.routes.js';


const router = express.Router();

router.use('/v1/auth', authRoutes);
router.use('/v1/user', userRoutes);
router.use('/v1/post', postRoutes)
router.use('/v1/comment', commentRoutes)
router.use('/v1/notification', notificationRoutes)


export default router;
