import { Router, Request, Response, NextFunction } from 'express';
import { handleAuth, handleAuthCallback } from '../controllers/auth';
import { authenticateToken } from '../middlewares/auth';
import { AuthenticatedRequest } from '../types/auth';

const router = Router();

// ユーザー情報の取得
router.get('/me', authenticateToken, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authReq = req as AuthenticatedRequest;
    res.json(authReq.user);
  } catch (error) {
    next(error);
  }
});

// Google認証
router.get('/google', handleAuth('google'));
router.get('/google/callback', handleAuthCallback('google'));

// Facebook認証
router.get('/facebook', handleAuth('facebook'));
router.get('/facebook/callback', handleAuthCallback('facebook'));

// Twitter認証
router.get('/twitter', handleAuth('twitter'));
router.get('/twitter/callback', handleAuthCallback('twitter'));

// LINE認証
router.get('/line', handleAuth('line'));
router.get('/line/callback', handleAuthCallback('line'));

// Apple認証
router.get('/apple', handleAuth('apple'));
router.get('/apple/callback', handleAuthCallback('apple'));

// ログアウト
router.post('/logout', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.clearCookie('token');
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

export default router;