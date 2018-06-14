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
let registerFunction = () => {
    Mongoose.connect('mongodb://localhost/registerDB');
    let db = Mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("we are in");
        let registerSchema = new Mongoose.Schema({ name: String });
        let test = Mongoose.model('users', registerSchema);
        let entry = new test({
            username: 'ovidio', email: 'ovidio@mail.com', password: 'pass'
        });
        entry.save().then(() => db.close());
    });
};
registerFunction();
