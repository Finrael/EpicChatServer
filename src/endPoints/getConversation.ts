// imports
import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
const router = express.Router();
import jwt, { verify } from 'jsonwebtoken';
import JWTSECRET from '../constants';
import passportJWT from 'passport-jwt';
import conversation from '../db/models/conversationSchema';
import { Types, Schema } from "mongoose";

router.post('/getConversation', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const conversationData = await conversation.findOne({ _id: req.body.convId }, { participants: 1, creationTime: 1, _id:1 })
        console.log('from get conversations', conversationData, '----------------------------------------')
        res.json(conversationData);
    } catch (e) {
        console.log(e)
        res.end();
    }
});
export default router;