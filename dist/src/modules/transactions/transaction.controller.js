"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const transaction_service_1 = require("./transaction.service");
const response_util_1 = require("../../utils/response.util");
const transaction_validator_1 = require("../../validators/transaction.validator");
class TransactionController {
    static async create(req, res, next) {
        try {
            const parsed = transaction_validator_1.createTransactionSchema.safeParse(req.body);
            if (!parsed.success) {
                const errors = parsed.error.errors.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));
                response_util_1.ResponseUtil.error(res, 'Validation failed', 400, errors);
                return;
            }
            // the non-null assertion is safe here because the role middleware fires first
            const transaction = await transaction_service_1.TransactionService.create(parsed.data, req.user.userId);
            response_util_1.ResponseUtil.created(res, transaction, 'Transaction created successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async getAll(req, res, next) {
        try {
            // casting all these because express query parsing is notoriously messy
            const query = {
                type: req.query.type,
                category: req.query.category,
                startDate: req.query.startDate,
                endDate: req.query.endDate,
                page: req.query.page,
                limit: req.query.limit,
                sortBy: req.query.sortBy,
                order: req.query.order,
                search: req.query.search,
            };
            const result = await transaction_service_1.TransactionService.getAll(query);
            response_util_1.ResponseUtil.success(res, result.transactions, 'Transactions fetched successfully', 200, result.pagination);
        }
        catch (error) {
            next(error);
        }
    }
    static async getById(req, res, next) {
        try {
            const transaction = await transaction_service_1.TransactionService.getById(req.params.id);
            response_util_1.ResponseUtil.success(res, transaction, 'Transaction fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const parsed = transaction_validator_1.updateTransactionSchema.safeParse(req.body);
            if (!parsed.success) {
                const errors = parsed.error.errors.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));
                response_util_1.ResponseUtil.error(res, 'Validation failed', 400, errors);
                return;
            }
            const transaction = await transaction_service_1.TransactionService.update(req.params.id, parsed.data);
            response_util_1.ResponseUtil.success(res, transaction, 'Transaction updated successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const transaction = await transaction_service_1.TransactionService.softDelete(req.params.id);
            response_util_1.ResponseUtil.success(res, transaction, 'Transaction soft-deleted successfully');
        }
        catch (error) {
            next(error);
        }
    }
}
exports.TransactionController = TransactionController;
//# sourceMappingURL=transaction.controller.js.map