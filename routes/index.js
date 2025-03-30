//boiler plate from M17A28
import {Router} from 'express';
import { userRouter } from './api/userRoutes.js';
import { thoughtRouter } from './api/thoughtRoutes.js';
const router = Router();

router.use('/users', userRouter);
router.use('/thoughts', thoughtRouter)

export default router;