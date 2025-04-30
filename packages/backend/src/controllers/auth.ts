import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthProvider } from '../types/auth';
import passport from 'passport';

export const handleAuth = (provider: AuthProvider) => (req: Request, res: Response, next: NextFunction): void => {
  try {
    passport.authenticate(provider)(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const handleAuthCallback = (provider: AuthProvider) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  passport.authenticate(provider, (err: any, user: any) => {
    if (err) {
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_error`);
    }

    if (!user) {
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
    }

    // JWTトークンの生成
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // クッキーにトークンを設定
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7日間
    });

    // フロントエンドのホームページにリダイレクト
    res.redirect(process.env.FRONTEND_URL || 'http://localhost:5173');
  })(req, res, next);
}