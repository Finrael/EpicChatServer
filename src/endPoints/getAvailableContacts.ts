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
 
 router.use('/getAvailablecontacts', passport.authenticate('jwt', {session:false}), async(req,res)=>{
    //  console.log('req.user: ',req.user)
     const listOfAvailableContacts = await User.findOne({_id: req.user!._id}, {contacts:1})
     .populate({
         path: 'contacts.contact',
         select: 'username  email'
     })
    //  .populate({
    //      path: 'contacts.conversationId',
    //      select:  'participants creationTime',
    //      populate: {
    //          path: 'participants.participant',
    //          select: 'email, username'
    //      }});
    //  console.log('list from the populate for availablecontacts3:', listOfAvailableContacts)
    res.json(listOfAvailableContacts);
 })

 export default router;