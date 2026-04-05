"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseUtil = void 0;
class ResponseUtil {
    static success(res, data, message = 'Request successful', statusCode = 200, pagination) {
        const response = {
            success: true,
            statusCode,
            message,
            data,
        };
        if (pagination) {
            response.pagination = pagination;
        }
        return res.status(statusCode).json(response);
    }
    static created(res, data, message = 'Resource created successfully') {
        return this.success(res, data, message, 201);
    }
    static error(res, message = 'An error occurred', statusCode = 500, errors) {
        const response = {
            success: false,
            statusCode,
            message,
        };
        // frontend team asked for specifically this errors array format
        if (errors && errors.length > 0) {
            response.errors = errors;
        }
        return res.status(statusCode).json(response);
    }
}
exports.ResponseUtil = ResponseUtil;
//# sourceMappingURL=response.util.js.map