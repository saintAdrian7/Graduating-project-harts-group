import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUserModel } from '../models/UserModel';
import { config } from '../config/Index';

declare module 'express-serve-static-core' {
    interface Request {
      user?: IUserModel;
    }
  }

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  jwt.verify(token, config.server.jwtSecret, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user as IUserModel
    next();
  });
};
