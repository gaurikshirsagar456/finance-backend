"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const db_1 = __importDefault(require("../../config/db"));
const errors_util_1 = require("../../utils/errors.util");
const pagination_util_1 = require("../../utils/pagination.util");
const user_model_1 = require("./user.model");
class UserService {
    static async getAllUsers(page, limit) {
        const pagination = pagination_util_1.PaginationUtil.parseParams(page, limit);
        const [users, total] = await Promise.all([
            db_1.default.user.findMany({
                select: user_model_1.userWithStatsSelect,
                skip: pagination.skip,
                take: pagination.take,
                orderBy: { createdAt: 'desc' },
            }),
            db_1.default.user.count(),
        ]);
        const meta = pagination_util_1.PaginationUtil.buildMeta(pagination.page, pagination.limit, total);
        return { users, pagination: meta };
    }
    static async getUserById(id) {
        const user = await db_1.default.user.findUnique({
            where: { id },
            select: user_model_1.userWithStatsSelect,
        });
        if (!user) {
            throw new errors_util_1.NotFoundError('User not found');
        }
        return user;
    }
    static async updateRole(id, role) {
        const user = await db_1.default.user.findUnique({ where: { id } });
        if (!user) {
            throw new errors_util_1.NotFoundError('User not found');
        }
        const updatedUser = await db_1.default.user.update({
            where: { id },
            data: { role },
            select: user_model_1.userSelectFields,
        });
        return updatedUser;
    }
    static async updateStatus(id, status) {
        const user = await db_1.default.user.findUnique({ where: { id } });
        if (!user) {
            throw new errors_util_1.NotFoundError('User not found');
        }
        const updatedUser = await db_1.default.user.update({
            where: { id },
            data: { status },
            select: user_model_1.userSelectFields,
        });
        return updatedUser;
    }
    static async deleteUser(id) {
        const user = await db_1.default.user.findUnique({ where: { id } });
        if (!user) {
            throw new errors_util_1.NotFoundError('User not found');
        }
        // if we hard delete this, users transactions get orphaned or cascade fails
        // soft deleting transactions first to be safe
        await db_1.default.transaction.updateMany({
            where: { createdBy: id },
            data: { isDeleted: true },
        });
        await db_1.default.user.delete({ where: { id } });
        return { message: 'User deleted successfully' };
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map