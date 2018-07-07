import * as Mongoose from 'mongoose';
import {
    Document,
    model,
    Schema,
    SchemaTypes,
    SchemaType

} from 'mongoose'
interface IConversation extends Document{
    participants:{_id:string, joinedDate:Date,status:boolean },
    creationTime:Date,
}
let registerFunction = () => {
  Mongoose.connect('mongodb://localhost/registerDB');
  let db = Mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log("we are in");
    let registerSchema = new Mongoose.Schema({ participants: [{type:SchemaTypes.ObjectId, ref:'users'} ],
    creationTime:Date, });
    let test = Mongoose.model<IConversation>('conversation', registerSchema);
    let entry = new test({ 
      participants: [{_id:'someID number', status:true, joinedWhen:''}], email:'ovidio@mail.com', password: 'pass' });
    entry.save().then(()=>db.close())
  });

}
registerFunction();