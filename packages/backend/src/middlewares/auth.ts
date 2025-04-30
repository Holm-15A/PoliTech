import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest, User } from '../types/auth';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err: any, user: any) => {
      if (err) {
        res.status(403).json({ message: 'Invalid token' });
        return;
      }

      (req as AuthenticatedRequest).user = user as User;
      next();
    });
  } catch (error) {
    next(error);
  }
};