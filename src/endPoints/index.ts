import registry from './postRegister';
import login from './postLogin';
import LFC from './lookingForContacts';
import authenticate from './getProfile';
import addContact from './addContacts';
import { Router } from 'express';
import getContacts from './getContactsForList'
import getAvailablecontacts from './getAvailableContacts';
import message from './message';
import getmessages from './getMessages'
const router = Router();


router.use(login);
router.use(authenticate);
router.use(registry);
router.use(addContact);
router.use(LFC);
router.use(getContacts);
router.use(getAvailablecontacts)
router.use(message);
router.use(getmessages)
export default router;
