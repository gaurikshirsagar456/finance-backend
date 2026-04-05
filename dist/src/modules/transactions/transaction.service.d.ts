import { TransactionQueryParams } from '../../types';
import { CreateTransactionInput, UpdateTransactionInput } from '../../validators/transaction.validator';
export declare class TransactionService {
    static create(data: CreateTransactionInput, userId: string): Promise<{
        user: {
            name: string;
            id: string;
            email: string;
        };
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        type: string;
        category: string;
        date: Date;
        description: string | null;
        isDeleted: boolean;
        createdBy: string;
    }>;
    static getAll(query: TransactionQueryParams): Promise<{
        transactions: {
            user: {
                name: string;
                id: string;
                email: string;
            };
            id: string;
            createdAt: Date;
            updatedAt: Date;
            amount: number;
            type: string;
            category: string;
            date: Date;
            description: string | null;
            isDeleted: boolean;
            createdBy: string;
        }[];
        pagination: import("../../types").PaginationMeta;
    }>;
    static getById(id: string): Promise<{
        user: {
            name: string;
            id: string;
            email: string;
        };
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        type: string;
        category: string;
        date: Date;
        description: string | null;
        isDeleted: boolean;
        createdBy: string;
    }>;
    static update(id: string, data: UpdateTransactionInput): Promise<{
        user: {
            name: string;
            id: string;
            email: string;
        };
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        type: string;
        category: string;
        date: Date;
        description: string | null;
        isDeleted: boolean;
        createdBy: string;
    }>;
    static softDelete(id: string): Promise<{
        user: {
            name: string;
            id: string;
            email: string;
        };
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        type: string;
        category: string;
        date: Date;
        description: string | null;
        isDeleted: boolean;
        createdBy: string;
    }>;
}
//# sourceMappingURL=transaction.service.d.ts.map