import { Request, Response } from "express";
import { Login, Register } from "../Services/Users";
import UserModel, { IUserModel } from "../models/UserModel";
import { invalidEmailorPasswordError } from "../Utils/Errors";
import mongoose from "mongoose";

export async function handleRegister(req:Request, res:Response){
    const user = req.body;
    try{
        const registeredUser = await Register(user);
        
            res.status(200).json({
                message:"Successfully registered user",
                user:{
                    id:registeredUser._id,
                    firstName: registeredUser.firstName,
                    lastName: registeredUser.lastName,
                    email: registeredUser.email,
                    
                }
            
            })
        

    }catch(error:any){
        if(error.message.includes("E11000 duplicate key error collection")){
            res.status(409).json({message:"User with email already exists", error:error.message})
        }else{
            res.status(500).json({message: "Unable to register User", error:error.message})
        }

    }
}

export async function handleLogin(req:Request, res:Response){
    const credintials = req.body
    try{
      const user:IUserModel = await Login(credintials)
      res.status(200).json({
        message:"Successfully logged in",
        user:{
            id:user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            
        }
        })

    }catch(error:any){
        if(error instanceof invalidEmailorPasswordError){
            res.status(409).json({message:"Unable to login user at this time", error:error.message})
        }else{
            res.status(500).json({message:"Unable to login user try again later", error:error.message})
        }

    }
}


export async function getUserById(req: Request, res: Response) {
    const { userId } = req.params;
    console.log('Received userId:', userId);

    try {
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const objectId = new mongoose.Types.ObjectId(userId);
        console.log('Converted objectId:', objectId);

        const user = await UserModel.findById(objectId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message:"Successfully fetched",
            user:{
                id:user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                
            }
            })
    } catch (error: any) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Unable to fetch user details', error: error.message });
    }
}
