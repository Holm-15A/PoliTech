"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
const client_1 = require("@prisma/client");
const auth_1 = require("./config/auth");
const auth_2 = __importDefault(require("./routes/auth"));
const kokkai_1 = __importDefault(require("./routes/kokkai"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const port = process.env.PORT || 3000;
// CORSの設定を更新
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// セッションの設定を更新
app.use((0, express_session_1.default)({
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
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
(0, auth_1.configureAuth)(passport_1.default);
// ルートの登録
app.use('/auth', auth_2.default);
app.use('/api/kokkai', kokkai_1.default);
// ヘルスチェックエンドポイント
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});
// ヘルスチェックエンドポイント (動作確認用)
app.get('/healthcheck', (req, res) => {
    res.json({ status: 'ok' });
});
// Prismaクライアントの終了処理
process.on('beforeExit', () => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
