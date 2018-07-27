"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const express_1 = __importDefault(require("express"));
const registerSchema_1 = __importDefault(require("../db/models/registerSchema"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.use('/getContacts', passport_1.default.authenticate('jwt', { session: false }), (req, res) => {
    //  console.log('getContacts log', req.user);
    //  console.log('req body',req.body.emailToLookFor)
    //  const query:any = User.find({email:req.body.query},{_id:1, email:1, name:1} )
    const query = registerSchema_1.default.find({ email: new RegExp(req.body.emailToLookFor) }, { _id: 1, email: 1, name: 1 });
    query.exec((err, docs) => {
        if (err) {
            return res.status(500).end('db error');
        }
        console.log(docs);
        res.json(docs);
    });
});
exports.default = router;
