"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const dashboard_service_1 = require("./dashboard.service");
const response_util_1 = require("../../utils/response.util");
class DashboardController {
    static async getSummary(_req, res, next) {
        try {
            const summary = await dashboard_service_1.DashboardService.getSummary();
            response_util_1.ResponseUtil.success(res, summary, 'Dashboard summary fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async getCategoryBreakdown(_req, res, next) {
        try {
            const breakdown = await dashboard_service_1.DashboardService.getCategoryBreakdown();
            response_util_1.ResponseUtil.success(res, breakdown, 'Category breakdown fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async getMonthlyTrends(_req, res, next) {
        try {
            const trends = await dashboard_service_1.DashboardService.getMonthlyTrends();
            response_util_1.ResponseUtil.success(res, trends, 'Monthly trends fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async getRecentActivity(_req, res, next) {
        try {
            const activity = await dashboard_service_1.DashboardService.getRecentActivity();
            response_util_1.ResponseUtil.success(res, activity, 'Recent activity fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async getWeeklySummary(_req, res, next) {
        try {
            const summary = await dashboard_service_1.DashboardService.getWeeklySummary();
            response_util_1.ResponseUtil.success(res, summary, 'Weekly summary fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
}
exports.DashboardController = DashboardController;
//# sourceMappingURL=dashboard.controller.js.map