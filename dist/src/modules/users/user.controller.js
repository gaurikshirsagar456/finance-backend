"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const response_util_1 = require("../../utils/response.util");
const user_validator_1 = require("../../validators/user.validator");
class UserController {
    static async getAll(req, res, next) {
        try {
            const { page, limit } = req.query;
            const result = await user_service_1.UserService.getAllUsers(page, limit);
            response_util_1.ResponseUtil.success(res, result.users, 'Users fetched successfully', 200, result.pagination);
        }
        catch (error) {
            next(error);
        }
    }
    static async getById(req, res, next) {
        try {
            const user = await user_service_1.UserService.getUserById(req.params.id);
            response_util_1.ResponseUtil.success(res, user, 'User fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async updateRole(req, res, next) {
        try {
            const parsed = user_validator_1.updateRoleSchema.safeParse(req.body);
            if (!parsed.success) {
                const errors = parsed.error.errors.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));
                response_util_1.ResponseUtil.error(res, 'Validation failed', 400, errors);
                return;
            }
            const user = await user_service_1.UserService.updateRole(req.params.id, parsed.data.role);
            response_util_1.ResponseUtil.success(res, user, 'User role updated successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async updateStatus(req, res, next) {
        try {
            const parsed = user_validator_1.updateStatusSchema.safeParse(req.body);
            if (!parsed.success) {
                const errors = parsed.error.errors.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));
                response_util_1.ResponseUtil.error(res, 'Validation failed', 400, errors);
                return;
            }
            const user = await user_service_1.UserService.updateStatus(req.params.id, parsed.data.status);
            response_util_1.ResponseUtil.success(res, user, 'User status updated successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const result = await user_service_1.UserService.deleteUser(req.params.id);
            response_util_1.ResponseUtil.success(res, result, 'User deleted successfully');
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map