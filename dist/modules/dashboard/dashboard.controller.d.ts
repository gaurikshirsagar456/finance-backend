import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../types';
export declare class DashboardController {
    static getSummary(_req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    static getCategoryBreakdown(_req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    static getMonthlyTrends(_req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    static getRecentActivity(_req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    static getWeeklySummary(_req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=dashboard.controller.d.ts.map
