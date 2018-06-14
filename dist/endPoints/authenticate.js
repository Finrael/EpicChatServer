"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.use('/authenticate', passport_1.default.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.user);
    res.json(req.user);
});
exports.default = router;
