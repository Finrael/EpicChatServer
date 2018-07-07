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
import conversation from '../db/models/conversationSchema';
import moment from 'moment';

router.post('/addContacts', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        // console.log('emailtolookfor ', req.body)
        // req.body.email='a3'

        const newContact = await User.find({ email: req.body.userToAdd }, )
        // console.log('new Contact ', newContact[0]._id)
        const contactToLookFor = newContact[0]._id;
        // contactToLookFor = '2';
        // console.log( 'AUTHENTICATED USER', req.user)

        // const checkForContactPresence = await User.find({contacts:{$elemMatch:{contactToLookFor}}})
        const checkForContactPresence = await User.find({ email: req.body.email, contacts: { "$in": [contactToLookFor] } });
        // console.log('after confirm presence' , checkForContactPresence);cf
        // console.log('length', checkForContactPresence.length)

        if (checkForContactPresence.length === 0) {
            let filter = { email: req.body.email };


            //create conversation
            console.log(newContact[0]._id)
            const creationDate = new Date()
            const newConversation = {
                participants: [{ participant: req.user!._id, joinedDate: creationDate, status: 1 },
                { participant: newContact[0]._id, joinedDate: creationDate, status: 1 }],
                creationTime: creationDate,
            }
            const generateConversation = await conversation.create(newConversation);
            console.log('This is the conversation:', generateConversation._id, ' and the contact is', newContact[0]._id);
            let update = { $push: { contacts: { contact: newContact[0]._id, conversationId: generateConversation._id } } };

            const updateUser = await User.update(filter, update)

            res.end('Contact saved');
        } else {
            res.end('Contact can not be saved')
        }
        console.log('postRegister is in: ', req.body);
    } catch (e) {
        console.log('error: ', e);
        res.status(500)
    }

    // res.end();
});


export default router