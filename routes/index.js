//boiler plate from M17A28
import {Router} from 'express';
import apiRoutes from './api/index.js';
const router = Router();

router.use('/api', apiRoutes);

export default router;