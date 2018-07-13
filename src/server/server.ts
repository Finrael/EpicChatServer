// import base modules 
import express, { json } from 'express';
import bodyParser, { Options } from 'body-parser';
import cookieParser from 'cookie-parser';
// create variable app which will be the main instance of express ( the main instance of the software)
const app = express();
// create variable port which is the server's port
const port = process.env.PORT || 5000;
// import the "secret key" from the file constants
import JWTSECRET from '../constants';
//ipmort mongoose (db)
import mongoose, { Schema, Model, model } from 'mongoose';
// this import the schema (the db schema)
import User from '../db/models/registerSchema';
// import the rest of the libraries
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import passportLocalMongoose from 'passport-local-mongoose';
// import schema from '../db/models/schema';
import { Session } from 'inspector'; 
import PassportJWT from 'passport-jwt';
// import and make jwtStrategy run (execute instructions on that file)
import '../endPoints/jwtStrategy';
//import the endpoints 
import endPoints from './../endPoints';
// import chatEndpoint from './../chatEndpoints';
// instructions to connect to the db (registerDB)
mongoose.connect(
    'mongodb://localhost:27017/registerDB', (error: any) => {

        if (error) {
            console.log('error');
            process.exit();
            return
        }
        else {
            console.log('db connected')
        }
    }
)
//create the strategy for passport with the data from the schema
passport.use(User.createStrategy());
// initialize passport middleware
const passportExpressMiddleware= passport.initialize();
// activate body parser (allows us to get the body from the request )
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passportExpressMiddleware);
// enables cookieParser
app.use(cookieParser());
// if the route from the browser implies /api sends them to the index.ts file on folder endpoints
app.use('/api', endPoints);
// app.use('/chat/api', endPoints);
// app.use('/chat/api', chatEndpoint);
// instruction to listen to a port 
app.listen(port, () => console.log(`Listening on port ${port}`));