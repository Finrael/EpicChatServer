"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const registerSchema_1 = __importDefault(require("./models/registerSchema"));
let testFunction = () => {
    mongoose_1.default.connect('mongodb://localhost/registerDB');
    let db = mongoose_1.default.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("we are in");
        let entry = new registerSchema_1.default({ username: 'ovidio', email: 'finros' });
        entry.setPassword('12345', function () {
            console.log(entry.username);
            entry.save().then(() => db.close());
        });
        // db.close();
    });
};
testFunction();
