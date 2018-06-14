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

router.use('/authenticate', passport.authenticate('jwt', {session:false}), (req,res)=>{
console.log(req.user);
res.json(req.user);
});
export default router;