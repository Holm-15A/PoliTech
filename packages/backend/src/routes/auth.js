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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const auth_2 = require("../middlewares/auth");
const router = (0, express_1.Router)();
// ユーザー情報の取得
router.get('/me', auth_2.authenticateToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authReq = req;
        res.json(authReq.user);
    }
    catch (error) {
        next(error);
    }
}));
// Google認証
router.get('/google', (0, auth_1.handleAuth)('google'));
router.get('/google/callback', (0, auth_1.handleAuthCallback)('google'));
// Facebook認証
router.get('/facebook', (0, auth_1.handleAuth)('facebook'));
router.get('/facebook/callback', (0, auth_1.handleAuthCallback)('facebook'));
// Twitter認証
router.get('/twitter', (0, auth_1.handleAuth)('twitter'));
router.get('/twitter/callback', (0, auth_1.handleAuthCallback)('twitter'));
// LINE認証
router.get('/line', (0, auth_1.handleAuth)('line'));
router.get('/line/callback', (0, auth_1.handleAuthCallback)('line'));
// Apple認証
router.get('/apple', (0, auth_1.handleAuth)('apple'));
router.get('/apple/callback', (0, auth_1.handleAuthCallback)('apple'));
// ログアウト
router.post('/logout', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('token');
        res.json({ success: true });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
