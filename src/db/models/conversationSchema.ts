// import corresponding functions from mongoose's module (for the db)
import {
    Document,
    model,
    Schema,
    SchemaTypes,
    SchemaType

} from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose';
// export the interace IregisterProps which provides the types for the props fiven to Register
export interface IConversation extends Document{
    participants:{participant:string,
             joinedDate:Date,status:number },
    creationTime:Date,
}
// creates the schema for the db
const conversationSchema = new Schema({
    participants: [{participant:{type:SchemaTypes.ObjectId, ref:'users'},
    joinedDate:SchemaTypes.Date,
     status:SchemaTypes.Number} ],
    creationTime:SchemaTypes.Date,
});

// required sentence to add typings to usermodel
export default model<IConversation>("conversation", conversationSchema);