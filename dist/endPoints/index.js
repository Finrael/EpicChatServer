"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const postRegister_1 = __importDefault(require("./postRegister"));
const postLogin_1 = __importDefault(require("./postLogin"));
const lookingForContacts_1 = __importDefault(require("./lookingForContacts"));
const authenticate_1 = __importDefault(require("./authenticate"));
const express_1 = require("express");
const router = express_1.Router();
router.use(postLogin_1.default);
router.use(authenticate_1.default);
router.use(postRegister_1.default);
router.use(lookingForContacts_1.default);
exports.default = router;
