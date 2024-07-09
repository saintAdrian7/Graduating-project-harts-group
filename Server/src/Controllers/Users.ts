import { Request, Response } from "express";
import { User } from "../Interfaces/User";
import UserModel, { IUserModel } from "../models/UserModel";
import { config } from "../config/Index";
import bcrypt from 'bcrypt';


export async function Register(user:User):Promise<IUserModel>{
    const Rounds = config.server.rounds
    try{
        const hashedPassword = await bcrypt.hash(user.password, Rounds)
        const savedUser = new UserModel({...user, hashedPassword})
        return await  savedUser.save()

    }catch(error:any){
        throw new Error(error.message)
      
    }
};

