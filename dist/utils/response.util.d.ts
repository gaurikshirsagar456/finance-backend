import { Response } from 'express';
import { PaginationMeta, ValidationError } from '../types';
export declare class ResponseUtil {
    static success<T>(res: Response, data: T, message?: string, statusCode?: number, pagination?: PaginationMeta): Response;
    static created<T>(res: Response, data: T, message?: string): Response;
    static error(res: Response, message?: string, statusCode?: number, errors?: ValidationError[]): Response;
}
//# sourceMappingURL=response.util.d.ts.map