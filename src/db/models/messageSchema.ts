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
export interface IMessageProps extends Document{
    message:string,
    messageTime:Date,
    messageOriginator:{_Id:string, name:string},
    consersationId:string,
}
// creates the schema for the db
const registerSchema = new Schema({
    message:String,
    messageTime:Date,
    messageOriginator:{_Id:String, name:String},
    consersationId: String,
});

// required sentence to add typings to usermodel
export default model<IMessageProps>("messages", registerSchema);