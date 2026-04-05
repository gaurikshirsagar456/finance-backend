"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatusSchema = exports.updateRoleSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
const types_1 = require("../types");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z
        .string({ required_error: 'Name is required' })
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be at most 100 characters')
        .trim(),
    email: zod_1.z
        .string({ required_error: 'Email is required' })
        .email('Invalid email format')
        .toLowerCase()
        .trim(),
    password: zod_1.z
        .string({ required_error: 'Password is required' })
        // maybe increase this later, 6 is kinda weak but leaving for now
        .min(6, 'Password must be at least 6 characters')
        .max(128, 'Password must be at most 128 characters'),
    role: zod_1.z
        .nativeEnum(types_1.Role, { errorMap: () => ({ message: 'Role must be VIEWER, ANALYST, or ADMIN' }) })
        .optional()
        .default(types_1.Role.VIEWER),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: 'Email is required' })
        .email('Invalid email format')
        .toLowerCase()
        .trim(),
    password: zod_1.z
        .string({ required_error: 'Password is required' })
        .min(1, 'Password is required'), // just check if it exists, dont need length check on login
});
exports.updateRoleSchema = zod_1.z.object({
    role: zod_1.z.nativeEnum(types_1.Role, {
        errorMap: () => ({ message: 'Role must be VIEWER, ANALYST, or ADMIN' }),
    }),
});
exports.updateStatusSchema = zod_1.z.object({
    status: zod_1.z.nativeEnum(types_1.UserStatus, {
        errorMap: () => ({ message: 'Status must be ACTIVE or INACTIVE' }),
    }),
});
//# sourceMappingURL=user.validator.js.map