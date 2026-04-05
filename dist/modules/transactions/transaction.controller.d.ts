import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../types';
export declare class TransactionController {
    static create(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    static getAll(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    static getById(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    static update(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    static delete(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=transaction.controller.d.ts.map
