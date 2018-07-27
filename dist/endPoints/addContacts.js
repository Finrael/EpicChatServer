"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const express_1 = __importDefault(require("express"));
const registerSchema_1 = __importDefault(require("../db/models/registerSchema"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
const conversationSchema_1 = __importDefault(require("../db/models/conversationSchema"));
router.post('/addContacts', passport_1.default.authenticate('jwt', { session: false }), (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        // console.log('emailtolookfor ', req.body)
        // req.body.email='a3'
        const newContact = yield registerSchema_1.default.find({ email: req.body.userToAdd });
        // console.log('new Contact ', newContact[0]._id)
        const contactToLookFor = newContact[0]._id;
        // contactToLookFor = '2';
        // console.log( 'AUTHENTICATED USER', req.user)
        // const checkForContactPresence = await User.find({contacts:{$elemMatch:{contactToLookFor}}})
        const checkForContactPresence = yield registerSchema_1.default.find({ email: req.body.email, contacts: { "$in": [contactToLookFor] } });
        // console.log('after confirm presence' , checkForContactPresence);cf
        // console.log('length', checkForContactPresence.length)
        if (checkForContactPresence.length === 0) {
            let filter = { email: req.body.email };
            let filter2 = { email: newContact[0].email };
            //create conversation
            // console.log(newContact[0]._id)
            const creationDate = new Date();
            const newConversation = {
                participants: [{ participant: req.user._id, joinedDate: creationDate, status: 1 },
                    { participant: newContact[0]._id, joinedDate: creationDate, status: 1 }],
                creationTime: creationDate,
            };
            const generateConversation = yield conversationSchema_1.default.create(newConversation);
            // console.log('This is the conversation:', generateConversation._id, ' and the contact is', newContact[0]._id, "this is the user ", req.user!._id);
            let update = { $push: { contacts: { contact: newContact[0]._id, conversationId: generateConversation._id } } };
            let update2 = { $push: { contacts: { contact: req.user._id, conversationId: generateConversation._id } } };
            const updateUser = yield registerSchema_1.default.update(filter, update);
            const updateUser2 = yield registerSchema_1.default.update(filter2, update2);
            res.end('Contact saved');
        }
        else {
            res.end('Contact can not be saved');
        }
        // console.log('postRegister is in: ', req.body);
    }
    catch (e) {
        console.log('error: ', e);
        res.status(500);
    }
    // res.end();
}));
exports.default = router;
