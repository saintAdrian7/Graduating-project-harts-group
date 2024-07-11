import jwt from "jsonwebtoken";
import { IUserModel, User } from "../models/UserModel.js";
import { Request,Response,NextFunction } from "express";
import { JwtPayload } from 'jsonwebtoken';
import { string } from "joi";

interface AuthRequest extends Request {
  user?: IUserModel;
}

export const isAuth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.token as string;

    if (!token){
      res.status(403).json({
        message: "Please Login",
      });
      return;
    }

    const decodedData = jwt.verify(token, process.env.Jwt_Sec as string) as JwtPayload & {_id:string};

    req.user = await User.findById(decodedData._id) as IUserModel;

    next();
  } catch (error) {
    res.status(500).json({
      message: "Login First",
    });
  }
};

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    if (req.user?.role !== "admin"){
      res.status(403).json({
        message: "You are not admin",
      });
      return;
    }

    next();
  } catch (error:any) {
    res.status(500).json({message: error.message});
  }
};
