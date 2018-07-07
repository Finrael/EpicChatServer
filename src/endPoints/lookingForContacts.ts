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
 
 router.use('/getContacts', passport.authenticate('jwt', {session:false}), (req,res)=>{
 console.log('getContacts log', req.user);
 console.log('req body',req.body.emailToLookFor)
//  const query:any = User.find({email:req.body.query},{_id:1, email:1, name:1} )

 const query:any = User.find({email:new RegExp(req.body.emailToLookFor)},{_id:1, email:1, name:1} )
 query.exec((err:any,docs:any)=>{
if (err){
    return res.status(500).end('db error')
}
console.log(docs)
res.json(docs);
});

 });
 export default router;