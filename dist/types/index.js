"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionType = exports.UserStatus = exports.Role = void 0;
var Role;
(function (Role) {
    Role["VIEWER"] = "VIEWER";
    Role["ANALYST"] = "ANALYST";
    Role["ADMIN"] = "ADMIN";
})(Role || (exports.Role = Role = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["ACTIVE"] = "ACTIVE";
    UserStatus["INACTIVE"] = "INACTIVE";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
var TransactionType;
(function (TransactionType) {
    TransactionType["INCOME"] = "INCOME";
    TransactionType["EXPENSE"] = "EXPENSE";
})(TransactionType || (exports.TransactionType = TransactionType = {}));
//# sourceMappingURL=index.js.map