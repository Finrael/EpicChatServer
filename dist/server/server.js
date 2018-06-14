"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
// import base modules 
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// create variable app which will be the main instance of express ( the main instance of the software)
const app = express_1.default();
// create variable port which is the server's port
const port = process.env.PORT || 5000;
//ipmort mongoose (db)
const mongoose_1 = __importDefault(require("mongoose"));
// this import the schema (the db schema)
const registerSchema_1 = __importDefault(require("../db/models/registerSchema"));
// import the rest of the libraries
const passport_1 = __importDefault(require("passport"));
// import and make jwtStrategy run (execute instructions on that file)
require("../endPoints/jwtStrategy");
//import the endpoints 
const endPoints_1 = __importDefault(require("./../endPoints"));
// instructions to connect to the db (registerDB)
mongoose_1.default.connect('mongodb://localhost:27017/registerDB', (error) => {
    if (error) {
        console.log('error');
        process.exit();
        return;
    }
    else {
        console.log('db connected');
    }
});
//create the strategy for passport with the data from the schema
passport_1.default.use(registerSchema_1.default.createStrategy());
// initialize passport middleware
const passportExpressMiddleware = passport_1.default.initialize();
// activate body parser (allows us to get the body from the request )
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(passportExpressMiddleware);
// enables cookieParser
app.use(cookie_parser_1.default());
// if the route from the browser implies /api sends them to the index.ts file on folder endpoints
app.use('/api', endPoints_1.default);
// instruction to listen to a port 
app.listen(port, () => console.log(`Listening on port ${port}`));
