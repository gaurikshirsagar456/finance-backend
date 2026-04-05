"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionWithUserSelect = exports.transactionSelectFields = void 0;
exports.transactionSelectFields = {
    id: true,
    amount: true,
    type: true,
    category: true,
    date: true,
    description: true,
    isDeleted: true,
    createdBy: true,
    createdAt: true,
    updatedAt: true,
};
exports.transactionWithUserSelect = {
    ...exports.transactionSelectFields,
    user: {
        select: {
            id: true,
            name: true,
            email: true,
        },
    },
};
//# sourceMappingURL=transaction.model.js.map