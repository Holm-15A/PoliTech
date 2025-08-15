"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ message: 'Authentication required' });
            return;
        }
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
            if (err) {
                res.status(403).json({ message: 'Invalid token' });
                return;
            }
            req.user = user;
            next();
        });
    }
    catch (error) {
        next(error);
    }
};
exports.authenticateToken = authenticateToken;
