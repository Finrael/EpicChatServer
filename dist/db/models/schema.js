"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const testSchema = new mongoose_1.Schema({
    name: String,
});
exports.default = mongoose_1.model("testName", testSchema);
