"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const db_1 = __importDefault(require("../../config/db"));
const errors_util_1 = require("../../utils/errors.util");
const pagination_util_1 = require("../../utils/pagination.util");
const transaction_model_1 = require("./transaction.model");
class TransactionService {
    static async create(data, userId) {
        const transaction = await db_1.default.transaction.create({
            data: {
                amount: data.amount,
                type: data.type,
                category: data.category,
                date: new Date(data.date),
                // sending empty string as desc was throwing errors so coalescing to null
                description: data.description || null,
                createdBy: userId,
            },
            select: transaction_model_1.transactionWithUserSelect,
        });
        return transaction;
    }
    static async getAll(query) {
        const pagination = pagination_util_1.PaginationUtil.parseParams(query.page, query.limit);
        // filtering out soft deleted always
        const where = {
            isDeleted: false,
        };
        if (query.type) {
            where.type = query.type;
        }
        // letting people search by partial category name
        if (query.category) {
            where.category = {
                contains: query.category,
            };
        }
        if (query.startDate || query.endDate) {
            where.date = {};
            if (query.startDate) {
                where.date.gte = new Date(query.startDate);
            }
            if (query.endDate) {
                where.date.lte = new Date(query.endDate);
            }
        }
        if (query.search) {
            where.OR = [
                { description: { contains: query.search } },
                { category: { contains: query.search } },
            ];
        }
        // fallback to date so it doesnt just return arbitrary order
        const validSortFields = ['date', 'amount', 'category', 'type', 'createdAt'];
        const sortBy = validSortFields.includes(query.sortBy || '') ? query.sortBy : 'date';
        const order = query.order === 'asc' ? 'asc' : 'desc';
        const [transactions, total] = await Promise.all([
            db_1.default.transaction.findMany({
                where,
                select: transaction_model_1.transactionWithUserSelect,
                skip: pagination.skip,
                take: pagination.take,
                orderBy: { [sortBy]: order },
            }),
            db_1.default.transaction.count({ where }),
        ]);
        const meta = pagination_util_1.PaginationUtil.buildMeta(pagination.page, pagination.limit, total);
        return { transactions, pagination: meta };
    }
    static async getById(id) {
        const transaction = await db_1.default.transaction.findFirst({
            where: { id, isDeleted: false },
            select: transaction_model_1.transactionWithUserSelect,
        });
        if (!transaction) {
            throw new errors_util_1.NotFoundError('Transaction not found');
        }
        return transaction;
    }
    static async update(id, data) {
        const existing = await db_1.default.transaction.findFirst({
            where: { id, isDeleted: false },
        });
        if (!existing) {
            throw new errors_util_1.NotFoundError('Transaction not found');
        }
        const updateData = {};
        if (data.amount !== undefined)
            updateData.amount = data.amount;
        if (data.type !== undefined)
            updateData.type = data.type;
        if (data.category !== undefined)
            updateData.category = data.category;
        if (data.date !== undefined)
            updateData.date = new Date(data.date);
        if (data.description !== undefined)
            updateData.description = data.description;
        const transaction = await db_1.default.transaction.update({
            where: { id },
            data: updateData,
            select: transaction_model_1.transactionWithUserSelect,
        });
        return transaction;
    }
    static async softDelete(id) {
        const existing = await db_1.default.transaction.findFirst({
            where: { id, isDeleted: false },
        });
        if (!existing) {
            throw new errors_util_1.NotFoundError('Transaction not found');
        }
        // never hard delete financial records. auditors get mad.
        const transaction = await db_1.default.transaction.update({
            where: { id },
            data: { isDeleted: true },
            select: transaction_model_1.transactionWithUserSelect,
        });
        return transaction;
    }
}
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map