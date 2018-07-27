import SocketIO from 'socket.io'
import * as Http from 'http'
import { Socket } from 'net';
import passport from 'passport';
import * as jwt from 'jsonwebtoken'
import user from './db/models/registerSchema';
export let io: SocketIO.Server;
// import * as cookieParser from 'socket.io-cookie-parser'
import JWTSECRET from './constants'
export function Config(server: Http.Server) {
    io = SocketIO(server);

    io.use(async(socket, next) => {
        console.log('this', socket.request.headers.cookie)
        const cookie = socket.request.headers.cookie
        let spreadCookie1 = cookie.split(';')
        let spreadCookie2 = spreadCookie1[0].split('=')
      let verifyHolder=  (jwt.verify(spreadCookie2[1], JWTSECRET) as {_id:string} )
    //  let verifyHolder2 = JSON.parse(verifyHolder)        
        console.log('spreadcookoe', verifyHolder)
        if (verifyHolder){
        try {
            // passport.authenticate('jwt', {session:false})
            let aux:string;
            console.log('form the cookie???')
            const UserData = await user.findOne({_id:  verifyHolder._id  })
            console.log('conversation data', UserData!.contacts[0].conversationId, '--------------------------------')
            for (let i =0; UserData!.contacts.length>i;i++){
                
                aux = UserData!.contacts[i].conversationId.toString();
                socket.join(aux)
                console.log(aux);
            }
          socket.join(verifyHolder._id)
            next();
        } catch (e) {
            console.log(e)
            // res.end();
        }
        }    });

    io.on('connection', (socket) => {
        // socket.on('ss',(data)=>{console.log('Socket component online')
        io.emit('This is for some reason an event', 'this is to be send')
    })

}

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