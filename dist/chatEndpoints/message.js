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
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
const messageSchema_1 = __importDefault(require("../db/models/messageSchema"));
router.use('/message', passport_1.default.authenticate('jwt', { session: false }), (req, res) => __awaiter(this, void 0, void 0, function* () {
    console.log('from authenticate  ', req.user, 'finish profile');
    const creationDate = new Date();
    const newMessage = {
        messageText: 'textMessage',
        messageTime: Date,
        messageOriginator: { _Id: req.user._Id, name: req.user.name },
        conversationId: 'convID',
    };
    const generateMessage = yield messageSchema_1.default.create(newMessage);
    res.json('generateMessage');
}));
exports.default = router;
