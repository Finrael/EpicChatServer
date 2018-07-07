"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const postRegister_1 = __importDefault(require("./postRegister"));
const postLogin_1 = __importDefault(require("./postLogin"));
const lookingForContacts_1 = __importDefault(require("./lookingForContacts"));
const getProfile_1 = __importDefault(require("./getProfile"));
const addContacts_1 = __importDefault(require("./addContacts"));
const express_1 = require("express");
const getContactsForList_1 = __importDefault(require("./getContactsForList"));
const getAvailableContacts_1 = __importDefault(require("./getAvailableContacts"));
const router = express_1.Router();
router.use(postLogin_1.default);
router.use(getProfile_1.default);
router.use(postRegister_1.default);
router.use(addContacts_1.default);
router.use(lookingForContacts_1.default);
router.use(getContactsForList_1.default);
router.use(getAvailableContacts_1.default);
exports.default = router;
