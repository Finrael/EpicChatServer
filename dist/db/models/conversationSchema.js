"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import corresponding functions from mongoose's module (for the db)
const mongoose_1 = require("mongoose");
// creates the schema for the db
const conversationSchema = new mongoose_1.Schema({
    participants: [{ participant: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'users' },
            joinedDate: mongoose_1.SchemaTypes.Date,
            status: mongoose_1.SchemaTypes.Number }],
    creationTime: mongoose_1.SchemaTypes.Date,
});
// required sentence to add typings to usermodel
exports.default = mongoose_1.model("conversation", conversationSchema);
