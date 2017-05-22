"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constants_1 = require("./../common/Constants");
var User = (function () {
    function User(username, password, displayName, status, tasks, isRunning) {
        if (status === void 0) { status = Constants_1.USER_STATUS.ENABLED; }
        if (tasks === void 0) { tasks = []; }
        if (isRunning === void 0) { isRunning = false; }
        this.username = username;
        this.password = password;
        this.displayName = displayName;
        this.status = status;
        this.tasks = tasks;
        this.isRunning = isRunning;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map