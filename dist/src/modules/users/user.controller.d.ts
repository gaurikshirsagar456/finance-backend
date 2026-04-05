import { Request, Response, NextFunction } from 'express';
export declare class UserController {
    static getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
    static getById(req: Request, res: Response, next: NextFunction): Promise<void>;
    static updateRole(req: Request, res: Response, next: NextFunction): Promise<void>;
    static updateStatus(req: Request, res: Response, next: NextFunction): Promise<void>;
    static delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=user.controller.d.ts.map
