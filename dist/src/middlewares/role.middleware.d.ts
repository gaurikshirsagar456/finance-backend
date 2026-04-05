import { Response, NextFunction } from 'express';
import { AuthRequest, Role } from '../types';
export declare const authorizeRoles: (...allowedRoles: Role[]) => (req: AuthRequest, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=role.middleware.d.ts.map