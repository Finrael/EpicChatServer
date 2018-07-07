"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import corresponding functions from mongoose's module (for the db)
const mongoose_1 = require("mongoose");
// creates the schema for the db
const registerSchema = new mongoose_1.Schema({
    message: String,
    messageTime: Date,
    messageOriginator: { _Id: String, name: String },
    consersationId: String,
});
// required sentence to add typings to usermodel
exports.default = mongoose_1.model("messages", registerSchema);
