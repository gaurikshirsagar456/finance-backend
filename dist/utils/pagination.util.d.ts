import { PaginationMeta } from '../types';
export declare class PaginationUtil {
    static parseParams(page?: string, limit?: string): {
        skip: number;
        take: number;
        page: number;
        limit: number;
    };
    static buildMeta(page: number, limit: number, total: number): PaginationMeta;
}
//# sourceMappingURL=pagination.util.d.ts.map