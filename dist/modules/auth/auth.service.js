"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../../config/db"));
const types_1 = require("../../types");
const errors_util_1 = require("../../utils/errors.util");
// 12 is slow enough to be safe but fast enough not to bottleneck logins
const SALT_ROUNDS = 12;
class AuthService {
    static async register(data) {
        const existingUser = await db_1.default.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new errors_util_1.ConflictError('A user with this email already exists');
        }
        // this is kinda heavy, might want to offload if we get crazy traffic
        const hashedPassword = await bcryptjs_1.default.hash(data.password, SALT_ROUNDS);
        const user = await db_1.default.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                // defaulting to VIEWER so no one gets admin by accident
                role: data.role || types_1.Role.VIEWER,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
                createdAt: true,
            },
        });
        const token = this.generateToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        return { user, token };
    }
    static async login(data) {
        const user = await db_1.default.user.findUnique({
            where: { email: data.email },
        });
        if (!user) {
            // throwing generic error so we dont leak which emails exist
            throw new errors_util_1.UnauthorizedError('Invalid email or password');
        }
        if (user.status === 'INACTIVE') {
            throw new errors_util_1.UnauthorizedError('Account is deactivated. Contact an administrator.');
        }
        const isPasswordValid = await bcryptjs_1.default.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new errors_util_1.UnauthorizedError('Invalid email or password');
        }
        const token = this.generateToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        // pulling password out before sending to client. destructuring is weird but it works
        const { password: _, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }
    static generateToken(payload) {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            // TODO: build pipeline should honestly catch this before it even deploys
            throw new errors_util_1.InternalServerError('JWT_SECRET is not configured');
        }
        const tokenPayload = { ...payload };
        return jsonwebtoken_1.default.sign(tokenPayload, secret, {
            expiresIn: '24h', // leaving at 24h as requested
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map