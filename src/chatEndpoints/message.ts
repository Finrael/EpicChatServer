 // imports
 import express, { json } from 'express';
 import cookieParser from 'cookie-parser';
 import bodyParser from 'body-parser';
 import User from '../db/models/registerSchema';
 import passport from 'passport';
 const router = express.Router();
 import jwt, { verify } from 'jsonwebtoken';
 import JWTSECRET from '../constants';
 import passportJWT from 'passport-jwt';
 import message from '../db/models/messageSchema';


 router.use('/message', passport.authenticate('jwt', {session:false}), async(req,res)=>{
 console.log('from authenticate  ',req.user, 'finish profile');
 const creationDate = new Date()
 const newMessage = {
    messageText:'textMessage',
    messageTime:Date,
    messageOriginator:{_Id:req.user!._Id, name:req.user!.name},
    conversationId: 'convID',
 }
 const generateMessage = await message.create(newMessage);
 res.json('generateMessage');
 });
 export default router;