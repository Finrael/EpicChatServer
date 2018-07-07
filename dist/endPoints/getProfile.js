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
router.use('/authenticate', passport_1.default.authenticate('jwt', { session: false }), (req, res) => __awaiter(this, void 0, void 0, function* () {
    console.log('from authenticate getProfile ', req.user);
    debugger;
    const dataFromProfile = yield registerSchema_1.default.findOne({ _id: req.user }, { username: 1, email: 1, contacts: 1 });
    console.log('datafromProfile', dataFromProfile);
    res.json(dataFromProfile);
}));
exports.default = router;
