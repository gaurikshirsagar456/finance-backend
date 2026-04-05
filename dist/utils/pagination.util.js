"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationUtil = void 0;
// quick util to avoid repeating this math in every single list endpoint
class PaginationUtil {
    static parseParams(page, limit) {
        const parsedPage = Math.max(1, parseInt(page || '1', 10) || 1);
        // capping at 100 so nobody tries to ddos us by requesting 1 million rows at once
        const parsedLimit = Math.min(100, Math.max(1, parseInt(limit || '10', 10) || 10));
        return {
            skip: (parsedPage - 1) * parsedLimit,
            take: parsedLimit,
            page: parsedPage,
            limit: parsedLimit,
        };
    }
    static buildMeta(page, limit, total) {
        return {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        };
    }
}
exports.PaginationUtil = PaginationUtil;
//# sourceMappingURL=pagination.util.js.map