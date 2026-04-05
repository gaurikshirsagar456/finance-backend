import { z } from 'zod';
import { Role, UserStatus } from '../types';
export declare const registerSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    role: z.ZodDefault<z.ZodOptional<z.ZodNativeEnum<typeof Role>>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
    role: Role;
}, {
    name: string;
    email: string;
    password: string;
    role?: Role | undefined;
}>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const updateRoleSchema: z.ZodObject<{
    role: z.ZodNativeEnum<typeof Role>;
}, "strip", z.ZodTypeAny, {
    role: Role;
}, {
    role: Role;
}>;
export declare const updateStatusSchema: z.ZodObject<{
    status: z.ZodNativeEnum<typeof UserStatus>;
}, "strip", z.ZodTypeAny, {
    status: UserStatus;
}, {
    status: UserStatus;
}>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateRoleInput = z.infer<typeof updateRoleSchema>;
export type UpdateStatusInput = z.infer<typeof updateStatusSchema>;
//# sourceMappingURL=user.validator.d.ts.map