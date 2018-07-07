"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const registerSchema_1 = __importDefault(require("../db/models/registerSchema"));
const router = express_1.default.Router();
router.post('/register', (req, res) => {
    let post = new registerSchema_1.default({
        username: req.body.username,
        email: req.body.email,
        contacts: [],
    });
    post.setPassword(req.body.password, function (err, user) {
        if (err) {
            return res.status(500).end("Could not set password");
        }
        user.save(function (err) {
            if (err) {
                res.status(500).end("server error while saving");
                console.error(err);
                throw err;
            }
            else {
                console.log('save name successfull');
                res.end();
            }
        });
    });
    console.log('postRegister is in: ', req.body);
    // res.end();
});
exports.default = router;
