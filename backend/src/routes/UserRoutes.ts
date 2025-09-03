import express from 'express';
import { createUser, getUser } from '../controllers/userController';

const router = express.Router();

router.post('/user', createUser);
router.get('/user/:id', getUser);

const userRoutes = router;

export default userRoutes;