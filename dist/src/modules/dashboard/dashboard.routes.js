"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = require("./dashboard.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
const types_1 = require("../../types");
const router = (0, express_1.Router)();
// leaving these swagger definitions alone
/**
 * @swagger
 * /api/dashboard/summary:
 *   get:
 *     summary: Get financial summary (totalIncome, totalExpenses, netBalance, totalTransactions)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard summary fetched successfully
 */
router.get('/summary', auth_middleware_1.authenticate, (0, role_middleware_1.authorizeRoles)(types_1.Role.ADMIN, types_1.Role.ANALYST, types_1.Role.VIEWER), dashboard_controller_1.DashboardController.getSummary);
/**
 * @swagger
 * /api/dashboard/category-breakdown:
 *   get:
 *     summary: Get per-category totals
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category breakdown fetched successfully
 */
router.get('/category-breakdown', auth_middleware_1.authenticate, (0, role_middleware_1.authorizeRoles)(types_1.Role.ADMIN, types_1.Role.ANALYST), // viewers shouldn't see these breakdowns
dashboard_controller_1.DashboardController.getCategoryBreakdown);
/**
 * @swagger
 * /api/dashboard/monthly-trends:
 *   get:
 *     summary: Get monthly income vs expense trends
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly trends fetched successfully
 */
router.get('/monthly-trends', auth_middleware_1.authenticate, (0, role_middleware_1.authorizeRoles)(types_1.Role.ADMIN, types_1.Role.ANALYST), dashboard_controller_1.DashboardController.getMonthlyTrends);
/**
 * @swagger
 * /api/dashboard/recent-activity:
 *   get:
 *     summary: Get last 10 transactions sorted by date
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recent activity fetched successfully
 */
router.get('/recent-activity', auth_middleware_1.authenticate, (0, role_middleware_1.authorizeRoles)(types_1.Role.ADMIN, types_1.Role.ANALYST, types_1.Role.VIEWER), dashboard_controller_1.DashboardController.getRecentActivity);
/**
 * @swagger
 * /api/dashboard/weekly-summary:
 *   get:
 *     summary: Get income and expense for the last 7 days
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Weekly summary fetched successfully
 */
router.get('/weekly-summary', auth_middleware_1.authenticate, (0, role_middleware_1.authorizeRoles)(types_1.Role.ADMIN, types_1.Role.ANALYST), dashboard_controller_1.DashboardController.getWeeklySummary);
exports.default = router;
//# sourceMappingURL=dashboard.routes.js.map