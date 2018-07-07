"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = __importDefault(require("../constants"));
router.post('/logIn', passport_1.default.authenticate('local', { session: false }), (req, res) => {
    const { _id, email, username } = req.user;
    console.log('req user from login', req.user);
    const token = jsonwebtoken_1.default.sign({ _id, email, username }, constants_1.default, { expiresIn: "24h" });
    res.cookie('CookieUser', token);
    res.json({ token });
});
exports.default = router;
