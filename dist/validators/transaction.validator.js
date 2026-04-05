"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTransactionSchema = exports.createTransactionSchema = void 0;
const zod_1 = require("zod");
const types_1 = require("../types");
exports.createTransactionSchema = zod_1.z.object({
    amount: zod_1.z
        .number({ required_error: 'Amount is required', invalid_type_error: 'Amount must be a number' })
        .positive('Amount must be a positive number')
        // guarding against js floating point weirdness with absurdly huge numbers
        .max(999999999.99, 'Amount exceeds maximum allowed value'),
    type: zod_1.z.nativeEnum(types_1.TransactionType, {
        errorMap: () => ({ message: 'Type must be INCOME or EXPENSE' }),
    }),
    category: zod_1.z
        .string({ required_error: 'Category is required' })
        .min(1, 'Category is required')
        .max(50, 'Category must be at most 50 characters')
        .trim(),
    date: zod_1.z
        // some clients pass weird date formats, using strict parse
        .string({ required_error: 'Date is required' })
        .refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date format' }),
    description: zod_1.z
        .string()
        .max(500, 'Description must be at most 500 characters')
        .trim()
        .optional()
        .nullable(),
});
exports.updateTransactionSchema = zod_1.z.object({
    amount: zod_1.z
        .number({ invalid_type_error: 'Amount must be a number' })
        .positive('Amount must be a positive number')
        .max(999999999.99, 'Amount exceeds maximum allowed value')
        .optional(),
    type: zod_1.z
        .nativeEnum(types_1.TransactionType, {
        errorMap: () => ({ message: 'Type must be INCOME or EXPENSE' }),
    })
        .optional(),
    category: zod_1.z
        .string()
        .min(1, 'Category cannot be empty')
        .max(50, 'Category must be at most 50 characters')
        .trim()
        .optional(),
    date: zod_1.z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date format' })
        .optional(),
    description: zod_1.z
        .string()
        .max(500, 'Description must be at most 500 characters')
        .trim()
        .optional()
        .nullable(),
});
//# sourceMappingURL=transaction.validator.js.map