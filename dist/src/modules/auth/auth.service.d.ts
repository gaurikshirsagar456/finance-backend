import { RegisterInput, LoginInput } from '../../validators/user.validator';
export declare class AuthService {
    static register(data: RegisterInput): Promise<{
        user: {
            name: string;
            id: string;
            email: string;
            role: string;
            status: string;
            createdAt: Date;
        };
        token: string;
    }>;
    static login(data: LoginInput): Promise<{
        user: {
            name: string;
            id: string;
            email: string;
            role: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
    private static generateToken;
}
//# sourceMappingURL=auth.service.d.ts.map