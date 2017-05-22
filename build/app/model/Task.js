"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Task = (function () {
    function Task(runDate, status, message, snapshoot) {
        if (message === void 0) { message = ''; }
        if (snapshoot === void 0) { snapshoot = ''; }
        this.runDate = runDate;
        this.status = status;
        this.message = message;
        this.snapshoot = snapshoot;
    }
    return Task;
}());
exports.Task = Task;
//# sourceMappingURL=Task.js.map