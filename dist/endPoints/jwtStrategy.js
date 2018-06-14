"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const app = express_1.default();
const router = express_1.default.Router();
const registerSchema_1 = __importDefault(require("../db/models/registerSchema"));
const constants_1 = __importDefault(require("../constants"));
const JwtStrategy = require('passport-jwt').Strategy, ExtractJwt = require('passport-jwt').ExtractJwt;
let opts = {
    secretOrKey: constants_1.default,
    jwtFromRequest: (req) => {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies['CookieUser'];
        }
        console.log('this is the token: ', token);
        return token;
    }
};
passport_1.default.use(new JwtStrategy(opts, function (jwt_payload, done) {
    console.log('payload', jwt_payload);
    registerSchema_1.default.findOne({ _id: jwt_payload._id }, { _id: 1, email: 1, username: 1 }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        }
        else {
            return done(null, false);
        }
    });
}));
exports.default = passport_1.default;
