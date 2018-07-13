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
const messageSchema_1 = __importDefault(require("../db/models/messageSchema"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.post('/getMessages', passport_1.default.authenticate('jwt', { session: false }), (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        console.log('body: ', req.body);
        console.log('user: ', req.user);
        const listOfMessages = yield messageSchema_1.default.find({ conversationId: req.body.convId });
        console.log(listOfMessages);
        const messagesObject = {
            messageList: listOfMessages,
            conversationId: req.body.convId
        };
        res.json(messagesObject);
    }
    catch (e) {
        console.log(e);
        res.end();
    }
    // res.json(newMessage)
}));
exports.default = router;
