import mongoose, {Document, Schema, Model} from "mongoose";
import { User } from "../Interfaces/User";
import { required } from "joi";



export interface IUserModel extends User, Document{}

const UserSchema: Schema<IUserModel> = new Schema(
    {
        role:{
            type:String,
            default:'user'
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

const User:Model<IUserModel> = mongoose.model<IUserModel>('E-learning-users', UserSchema);

export {User};
export default mongoose.model<IUserModel>('E-learning-users', UserSchema);
