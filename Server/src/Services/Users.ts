
import { User } from "../Interfaces/User";
import UserModel, { IUserModel } from "../models/UserModel";
import { config } from "../config/Index";
import bcrypt from 'bcrypt';
import { invalidEmailorPasswordError, UnableToSaveUserError } from "../Utils/Errors";


export async function Register(user:User):Promise<IUserModel>{
    const Rounds = config.server.rounds
    try{
        const hashedPassword = await bcrypt.hash(user.password, Rounds)
        const savedUser = new UserModel({...user, password:hashedPassword})
        return await  savedUser.save()

    }catch(error:any){
        throw new UnableToSaveUserError(error.message)
      
    }
};

export async function Login (credintials: {email:string, password:string}):Promise <IUserModel>{
    const {email, password} = credintials
    try{
        const user = await UserModel.findOne({email})
        if(!user){
            throw new invalidEmailorPasswordError("Invalid Email")
        }else  {
            const isMatch:boolean = await bcrypt.compare(password, user.password)
            if(isMatch){
                return user
            }else{
                throw new invalidEmailorPasswordError('Invalid password')
            }
        }
       


    }catch(error:any){
        throw error

    }
}

export default {}