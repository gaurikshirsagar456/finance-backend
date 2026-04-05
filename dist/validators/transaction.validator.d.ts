import { z } from 'zod';
import { TransactionType } from '../types';
export declare const createTransactionSchema: z.ZodObject<{
    amount: z.ZodNumber;
    type: z.ZodNativeEnum<typeof TransactionType>;
    category: z.ZodString;
    date: z.ZodEffects<z.ZodString, string, string>;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    amount: number;
    type: TransactionType;
    category: string;
    date: string;
    description?: string | null | undefined;
}, {
    amount: number;
    type: TransactionType;
    category: string;
    date: string;
    description?: string | null | undefined;
}>;
export declare const updateTransactionSchema: z.ZodObject<{
    amount: z.ZodOptional<z.ZodNumber>;
    type: z.ZodOptional<z.ZodNativeEnum<typeof TransactionType>>;
    category: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    amount?: number | undefined;
    type?: TransactionType | undefined;
    category?: string | undefined;
    date?: string | undefined;
    description?: string | null | undefined;
}, {
    amount?: number | undefined;
    type?: TransactionType | undefined;
    category?: string | undefined;
    date?: string | undefined;
    description?: string | null | undefined;
}>;
export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
//# sourceMappingURL=transaction.validator.d.ts.map
