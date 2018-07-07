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

router.use('/authenticate', passport.authenticate('jwt', {session:false}), async(req,res)=>{
console.log('from authenticate getProfile ',req.user);
debugger
const dataFromProfile = await User.findOne({_id: req.user}, {username:1, email:1, contacts:1})
console.log('datafromProfile', dataFromProfile)
res.json(dataFromProfile);
});
export default router;