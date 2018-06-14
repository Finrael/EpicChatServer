import registry from './postRegister';
import login from './postLogin';
import LFC from './lookingForContacts';
import authenticate from './authenticate';
import { Router } from 'express';
const router = Router();

router.use(login);
router.use(authenticate);
router.use(registry);

router.use(LFC);
export default router;
