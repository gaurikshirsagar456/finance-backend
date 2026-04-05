"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const user_routes_1 = __importDefault(require("./modules/users/user.routes"));
const transaction_routes_1 = __importDefault(require("./modules/transactions/transaction.routes"));
const dashboard_routes_1 = __importDefault(require("./modules/dashboard/dashboard.routes"));
const errors_util_1 = require("./utils/errors.util");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || '3000', 10);
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
// bots kept trying to brute force passwords last week, 10 reqs per 15 mins should stop them
const authLimiter = (0, express_rate_limit_1.default)({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10', 10),
    message: {
        success: false,
        statusCode: 429,
        message: 'Too many requests from this IP. Please try again after 15 minutes.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Finance Backend API',
            version: '1.0.0',
            description: 'Finance Dashboard Backend',
            contact: {
                name: 'API Support',
            },
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        tags: [
            { name: 'Auth', description: 'Authentication endpoints' },
            { name: 'Users', description: 'User management (Admin only)' },
            { name: 'Transactions', description: 'Financial transaction operations' },
            { name: 'Dashboard', description: 'Dashboard analytics and summaries' },
        ],
    },
    apis: ['./src/modules/**/*.routes.ts'], // swagger pulls comments directly from here
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Finance Backend API Docs',
}));
app.get('/api-docs.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
// healthz endpoint for the load balancer 
app.get('/health', (_req, res) => {
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Server is running',
        data: {
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || 'development',
        },
    });
});
app.use('/api/auth', authLimiter, auth_routes_1.default);
app.use('/api/users', user_routes_1.default);
app.use('/api/transactions', transaction_routes_1.default);
app.use('/api/dashboard', dashboard_routes_1.default);
// catch anything else so we don't return express's ugly html 404 page
app.use((_req, res) => {
    res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Route not found',
    });
});
app.use((err, _req, res, _next) => {
    if (err instanceof errors_util_1.AppError) {
        return res.status(err.statusCode).json({
            success: false,
            statusCode: err.statusCode,
            message: err.message,
        });
    }
    // usually points to a db issue or unhandled promise rejection somewhere
    console.error('Unexpected error:', err);
    const message = process.env.NODE_ENV === 'production'
        ? 'An unexpected error occurred'
        : err.message || 'Internal server error';
    return res.status(500).json({
        success: false,
        statusCode: 500,
        message,
    });
});
if (process.env.NODE_ENV !== 'test') { // dont bind port when jest runs
    app.listen(PORT, () => {
        console.log(`\n🚀 Finance Backend Server running on http://localhost:${PORT}`);
        console.log(`📚 API Docs available at http://localhost:${PORT}/api-docs`);
        console.log(`🏥 Health check at http://localhost:${PORT}/health`);
        console.log(`📋 Environment: ${process.env.NODE_ENV || 'development'}\n`);
    });
}
exports.default = app;
//# sourceMappingURL=app.js.map