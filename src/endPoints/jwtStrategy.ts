import express from 'express';
import { Strategy } from 'passport-jwt';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
const app = express();
const router = express.Router();
import jwt from 'jsonwebtoken';
import PassportJWT from 'passport-jwt';
import User from '../db/models/registerSchema';
import JWTSECRET from '../constants';
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

let opts: PassportJWT.StrategyOptions = {
    secretOrKey: JWTSECRET,
    jwtFromRequest: (req) => {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies['CookieUser'];
        }
        console.log('this is the token: ', token)
        return token;
    }
};

passport.use(new JwtStrategy(opts, function (jwt_payload: any, done: any) {
    console.log('payload', jwt_payload);
    User.findOne({ _id: jwt_payload._id }, { _id: 1, email: 1, username:1  }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
             done(null, user);
        } else {
            return done(null, false);
        }
    });
}));
export default passport;