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
import {Types, Schema} from "mongoose";
import  {io} from '../SocketConfig'
 router.use('/message', passport.authenticate('jwt', {session:false}), async(req,res)=>{
//  console.log('from authenticate getProfile ',req.user);
try{
    // console.log('body: ', req.body);
    // console.log('user: ', req.user);
 const creationDate = new Date()
 const newMessage = {
    messageText: req.body.textMessage,
    messageTime:creationDate,
    messageOriginator:{_Id:req.user!._id, name:req.user!.username},
    conversationId: new Types.ObjectId(req.body.convId),
 }
 const generateMessage = await message.create(newMessage);
//  console.log(generateMessage)
 res.json(generateMessage);
 io.to(req.body.convId).emit('newMessage',generateMessage )

 console.log('it whent int to /message', req.body.convId)
} catch(e){
console.log(e)
res.end();
}
// res.json(newMessage)
 });
 export default router;