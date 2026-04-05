"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userWithStatsSelect = exports.userSelectFields = void 0;
// selecting fields safely so passwords dont leak out 
exports.userSelectFields = {
    id: true,
    name: true,
    email: true,
    role: true,
    status: true,
    createdAt: true,
    updatedAt: true,
};
exports.userWithStatsSelect = {
    ...exports.userSelectFields,
    _count: {
        select: { transactions: true },
    },
};
//# sourceMappingURL=user.model.js.map