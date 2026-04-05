"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = void 0;
const errors_util_1 = require("../utils/errors.util");
// factory so we can just pass roles right in the route definition
const authorizeRoles = (...allowedRoles) => {
    return (req, _res, next) => {
        if (!req.user) {
            // should never hit this if authenticate middleware runs first, but typscript complains
            return next(new errors_util_1.UnauthorizedError('Authentication required'));
        }
        if (!allowedRoles.includes(req.user.role)) {
            return next(new errors_util_1.ForbiddenError(`Access denied. Required role(s): ${allowedRoles.join(', ')}. Your role: ${req.user.role}`));
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
//# sourceMappingURL=role.middleware.js.map