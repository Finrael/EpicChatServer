"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = __importStar(require("mongoose"));
const mongoose_1 = require("mongoose");
let registerFunction = () => {
    Mongoose.connect('mongodb://localhost/registerDB');
    let db = Mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("we are in");
        let registerSchema = new Mongoose.Schema({ participants: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: 'users' }],
            creationTime: Date, });
        let test = Mongoose.model('conversation', registerSchema);
        let entry = new test({
            participants: [{ _id: 'someID number', status: true, joinedWhen: '' }], email: 'ovidio@mail.com', password: 'pass'
        });
        entry.save().then(() => db.close());
    });
};
registerFunction();
