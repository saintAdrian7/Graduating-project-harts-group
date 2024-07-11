import { Request, Response, NextFunction } from 'express';

const TryCatch = (handler: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await handler(req, res, next);
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };
};

export default TryCatch;
