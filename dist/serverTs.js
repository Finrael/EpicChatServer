"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
const port = process.env.PORT || 5000;
const mongoose_1 = __importDefault(require("mongoose"));
const schema_1 = __importDefault(require("./db/models/schema"));
mongoose_1.default.connect('mongodb://localhost:27017/db', (error) => {
    if (error) {
        console.log('error');
        process.exit();
        return;
    }
    else {
        console.log('db connected');
    } /////
});
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get('/api/hello2', (req, res) => {
    res.send({ express: 'Hello From Express' });
});
app.get('/api/test', (req, res) => {
    let directVariableTest = schema_1.default.findOne().then((testDoc) => { res.json(testDoc); }, () => { });
    schema_1.default.findOne().then((testDoc) => {
        res.send({ express: testDoc.name });
    }, () => { });
});
app.post('/api/testPost', (req, res) => {
    console.log('testpost is in');
    console.log(req.body.value);
    let post = new schema_1.default({
        name: req.body.value
    });
    console.log(req.body);
    post.save(function (err) {
        if (err) {
            throw err;
        }
        else {
            console.log('save name successfull');
        }
    });
}, () => { });
app.listen(port, () => console.log(`Listening on port ${port}`));
