import express from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { PrismaClient } from '@prisma/client';
import { configureAuth } from './config/auth';
import authRoutes from './routes/auth';
import kokkaiRoutes from './routes/kokkai';

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

// CORSの設定を更新
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());
app.use(cookieParser());

// セッションの設定を更新
app.use(session({
  secret: process.env.AUTH_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1週間
  }
}));

// Passportの初期化
app.use(passport.initialize());
app.use(passport.session());
configureAuth(passport);

// ルートの登録
app.use('/auth', authRoutes);
app.use('/api/kokkai', kokkaiRoutes);

// ヘルスチェックエンドポイント
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ヘルスチェックエンドポイント (動作確認用)
app.get('/healthcheck', (req, res) => {
  res.json({ status: 'ok' });
});

// Prismaクライアントの終了処理
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});