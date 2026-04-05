"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_controller_1 = require("./transaction.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
const types_1 = require("../../types");
const router = (0, express_1.Router)();
// leaving these swagger docs alone config team yelled at me last time I messed with them
/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount, type, category, date]
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 5000
 *               type:
 *                 type: string
 *                 enum: [INCOME, EXPENSE]
 *                 example: INCOME
 *               category:
 *                 type: string
 *                 example: Salary
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-06-15T00:00:00.000Z"
 *               description:
 *                 type: string
 *                 example: Monthly salary payment
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden - Admin only
 */
router.post('/', auth_middleware_1.authenticate, (0, role_middleware_1.authorizeRoles)(types_1.Role.ADMIN), // only admins can create for now
transaction_controller_1.TransactionController.create);
/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all transactions with filters and pagination
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [INCOME, EXPENSE]
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [date, amount, category, type, createdAt]
 *           default: date
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *     responses:
 *       200:
 *         description: Transactions fetched successfully
 */
router.get('/', auth_middleware_1.authenticate, (0, role_middleware_1.authorizeRoles)(types_1.Role.ADMIN, types_1.Role.ANALYST, types_1.Role.VIEWER), transaction_controller_1.TransactionController.getAll);
/**
 * @swagger
 * /api/transactions/{id}:
 *   get:
 *     summary: Get a single transaction by ID
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction fetched successfully
 *       404:
 *         description: Transaction not found
 */
router.get('/:id', auth_middleware_1.authenticate, (0, role_middleware_1.authorizeRoles)(types_1.Role.ADMIN, types_1.Role.ANALYST, types_1.Role.VIEWER), transaction_controller_1.TransactionController.getById);
/**
 * @swagger
 * /api/transactions/{id}:
 *   patch:
 *     summary: Update a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [INCOME, EXPENSE]
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *       404:
 *         description: Transaction not found
 */
router.patch('/:id', auth_middleware_1.authenticate, (0, role_middleware_1.authorizeRoles)(types_1.Role.ADMIN), transaction_controller_1.TransactionController.update);
/**
 * @swagger
 * /api/transactions/{id}:
 *   delete:
 *     summary: Soft delete a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction soft-deleted successfully
 *       404:
 *         description: Transaction not found
 */
router.delete('/:id', auth_middleware_1.authenticate, (0, role_middleware_1.authorizeRoles)(types_1.Role.ADMIN), transaction_controller_1.TransactionController.delete);
exports.default = router;
//# sourceMappingURL=transaction.routes.js.map