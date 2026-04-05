"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_util_1 = require("../utils/errors.util");
const authenticate = (req, _res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new errors_util_1.UnauthorizedError('Access token is missing or invalid');
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new errors_util_1.UnauthorizedError('Access token is missing');
        }
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            // this blew up in prod once, keeping the explicit check just in case
            throw new Error('JWT_SECRET is not configured');
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = {
            userId: decoded.userId,
            email: decoded.email,
            role: decoded.role,
        };
        next();
    }
    catch (error) {
        // dealing with weird jwt errors that dont map neatly to our custom ones
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            next(new errors_util_1.UnauthorizedError('Invalid or expired token'));
        }
        else if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            next(new errors_util_1.UnauthorizedError('Token has expired'));
        }
        else {
            next(error);
        }
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.middleware.js.map