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
exports.handleAuthCallback = exports.handleAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
const handleAuth = (provider) => (req, res, next) => {
    try {
        passport_1.default.authenticate(provider)(req, res, next);
    }
    catch (error) {
        next(error);
    }
};
exports.handleAuth = handleAuth;
const handleAuthCallback = (provider) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate(provider, (err, user) => {
        if (err) {
            return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_error`);
        }
        if (!user) {
            return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
        }
        // JWTトークンの生成
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });
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
});
exports.handleAuthCallback = handleAuthCallback;
