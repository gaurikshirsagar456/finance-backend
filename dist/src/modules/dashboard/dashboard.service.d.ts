import { DashboardSummary, CategoryBreakdown, MonthlyTrend, WeeklySummary } from '../../types';
export declare class DashboardService {
    static getSummary(): Promise<DashboardSummary>;
    static getCategoryBreakdown(): Promise<{
        categories: CategoryBreakdown[];
    }>;
    static getMonthlyTrends(): Promise<{
        trends: MonthlyTrend[];
    }>;
    static getRecentActivity(): Promise<{
        recentTransactions: {
            user: {
                name: string;
                id: string;
            };
            id: string;
            createdAt: Date;
            amount: number;
            type: string;
            category: string;
            date: Date;
            description: string | null;
        }[];
    }>;
    static getWeeklySummary(): Promise<WeeklySummary>;
}
//# sourceMappingURL=dashboard.service.d.ts.map