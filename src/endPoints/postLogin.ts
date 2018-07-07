
import express, { json } from 'express';
import bodyParser from 'body-parser';
const app = express();
import User from '../db/models/registerSchema';
import passport from 'passport';
const router = express.Router();
import jwt from 'jsonwebtoken';
import JWTSECRET from '../constants';

router.post('/logIn', passport.authenticate('local', { session: false }), (req, res) => {
    const { _id, email,username } = req.user!;
    console.log('req user from login', req.user)
    const token = jwt.sign({ _id, email, username }, JWTSECRET, { expiresIn: "24h" });
    res.cookie('CookieUser', token);
    res.json({token});
});

export default router;
 