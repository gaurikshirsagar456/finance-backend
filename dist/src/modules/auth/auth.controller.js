"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const response_util_1 = require("../../utils/response.util");
const user_validator_1 = require("../../validators/user.validator");
class AuthController {
    static async register(req, res, next) {
        try {
            const parsed = user_validator_1.registerSchema.safeParse(req.body);
            if (!parsed.success) {
                // mapping zod errors to our frontend format. took way too long to figure out 
                const errors = parsed.error.errors.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));
                response_util_1.ResponseUtil.error(res, 'Validation failed', 400, errors);
                return;
            }
            const result = await auth_service_1.AuthService.register(parsed.data);
            response_util_1.ResponseUtil.created(res, result, 'User registered successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async login(req, res, next) {
        try {
            const parsed = user_validator_1.loginSchema.safeParse(req.body);
            if (!parsed.success) {
                const errors = parsed.error.errors.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));
                response_util_1.ResponseUtil.error(res, 'Validation failed', 400, errors);
                return;
            }
            const result = await auth_service_1.AuthService.login(parsed.data);
            response_util_1.ResponseUtil.success(res, result, 'Login successful');
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map