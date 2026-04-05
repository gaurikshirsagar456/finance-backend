import { Role, UserStatus } from '../../types';
export declare class UserService {
    static getAllUsers(page?: string, limit?: string): Promise<{
        users: {
            name: string;
            id: string;
            email: string;
            role: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            _count: {
                transactions: number;
            };
        }[];
        pagination: import("../../types").PaginationMeta;
    }>;
    static getUserById(id: string): Promise<{
        name: string;
        id: string;
        email: string;
        role: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        _count: {
            transactions: number;
        };
    }>;
    static updateRole(id: string, role: Role): Promise<{
        name: string;
        id: string;
        email: string;
        role: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    static updateStatus(id: string, status: UserStatus): Promise<{
        name: string;
        id: string;
        email: string;
        role: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    static deleteUser(id: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=user.service.d.ts.map