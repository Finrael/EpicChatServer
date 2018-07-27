"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
const jwt = __importStar(require("jsonwebtoken"));
const registerSchema_1 = __importDefault(require("./db/models/registerSchema"));
// import * as cookieParser from 'socket.io-cookie-parser'
const constants_1 = __importDefault(require("./constants"));
function Config(server) {
    exports.io = socket_io_1.default(server);
    exports.io.use((socket, next) => __awaiter(this, void 0, void 0, function* () {
        console.log('this', socket.request.headers.cookie);
        const cookie = socket.request.headers.cookie;
        let spreadCookie1 = cookie.split(';');
        let spreadCookie2 = spreadCookie1[0].split('=');
        let verifyHolder = jwt.verify(spreadCookie2[1], constants_1.default);
        //  let verifyHolder2 = JSON.parse(verifyHolder)        
        console.log('spreadcookoe', verifyHolder);
        if (verifyHolder) {
            try {
                // passport.authenticate('jwt', {session:false})
                let aux;
                console.log('form the cookie???');
                const UserData = yield registerSchema_1.default.findOne({ _id: verifyHolder._id });
                console.log('conversation data', UserData.contacts[0].conversationId, '--------------------------------');
                for (let i = 0; UserData.contacts.length > i; i++) {
                    aux = UserData.contacts[i].conversationId.toString();
                    socket.join(aux);
                    console.log(aux);
                }
                socket.join(verifyHolder._id);
                next();
            }
            catch (e) {
                console.log(e);
                // res.end();
            }
        }
    }));
    exports.io.on('connection', (socket) => {
        // socket.on('ss',(data)=>{console.log('Socket component online')
        exports.io.emit('This is for some reason an event', 'this is to be send');
    });
}
exports.Config = Config;
//  try {
//     console.log(req.user)
//     const conversationData = await conversation.find({ participants:{participant:req.user!._id}  }, { participants: 1, creationTime: 1, _id: 1 })
//     console.log('conversation data',conversationData,'--------------------------------')
//     let aux: any = [];
//     conversationData.map(m => {
//         aux.push(m._id);
//         // SocketIO.
//         io.emit(m._id, (socket: SocketIO.Socket) => {
//             console.log('a user connected')
//         })
//     })
//     res.json(aux);
// } catch (e) {
//     console.log(e)
//     res.end();
// }
