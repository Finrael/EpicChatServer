"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
// import corresponding functions from mongoose's module (for the db)
const mongoose_1 = require("mongoose");
const passport_local_mongoose_1 = __importDefault(require("passport-local-mongoose"));
// creates the schema for the db
const registerSchema = new mongoose_1.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    attempts: Number,
    contacts: Array(String),
});
//create the options object and fills the required fields
let options = {};
options.usernameField = 'email';
options.usernameUnique = true;
options.limitAttempts = true;
options.maxAttempts = 5;
// creates the variable to show the error messsages of tyhe type PassportLocalErrorMessages
let errorMessages = {};
errorMessages.IncorrectPasswordError = 'wrong password';
options.errorMessages = errorMessages;
// adds the schema to the passport
registerSchema.plugin(passport_local_mongoose_1.default, options);
exports.default = mongoose_1.model("users", registerSchema);
