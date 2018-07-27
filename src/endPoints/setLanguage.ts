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
 
 router.use('/setLanguage', passport.authenticate('jwt', {session:false}), async(req,res)=>{
 // console.log('from authenticate getProfile ',req.user);
 console.log('///////////////////////////////////////', req.body.language)
    let filter={_id:req.user!._id};
    const update={language:req.body.language}
    const updateLanguage = await User.update(filter,update);
 res.json(updateLanguage);
 });
 export default router;