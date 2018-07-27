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
 
 router.use('/getContactsForList', passport.authenticate('jwt', {session:false}), async (req,res)=>{
 const listOfIDfromContacts =await  User.findOne({_id:req.user!._id},{contacts:1} ).populate('contacts',{email:1, username:1} )
// console.log('list from the populate:', listOfIDfromContacts)
res.json(listOfIDfromContacts);
 });
 export default router;