import mongoose, {Document, Schema} from "mongoose";
import { User } from "../Interfaces/User";




export interface IUserModel extends User, Document{}

const UserSchema: Schema = new Schema(
    {
        role:{
            type:String
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type:String,
            required:true,
            unique:true
        },
        password: {
           type: String,
           required: true
        }
    }
)


export default mongoose.model<IUserModel>('E-learning-users', UserSchema);