 // imports
 import express, { json } from 'express';
 import cookieParser from 'cookie-parser';
 import bodyParser from 'body-parser';
//  import User from '../db/models/messageSchema';
 import passport from 'passport';
 const router = express.Router();
 import jwt, { verify } from 'jsonwebtoken';
 import JWTSECRET from '../constants';
 import passportJWT from 'passport-jwt';
 import message from '../db/models/messageSchema';
import {Types, Schema} from "mongoose";

 router.post('/getMessages', passport.authenticate('jwt', {session:false}), async(req,res)=>{
try{
    // console.log('body: ', req.body);
    // console.log('user: ', req.user);
    const listOfMessages = await message.find({conversationId:req.body.convId})
    // console.log(listOfMessages)
    const messagesObject ={
        messageList: listOfMessages,
        conversationId:req.body.convId
    }
 res.json(messagesObject);
} catch(e){
console.log(e)
res.end();
}
// res.json(newMessage)
 });
 export default router;