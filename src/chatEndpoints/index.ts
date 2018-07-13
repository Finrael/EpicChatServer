import message from './message';
import { Router } from 'express';
const router = Router();


router.use(message);

export default router