"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Schedule = (function () {
    function Schedule(startDate, status, isRunning, rule) {
        this.startDate = startDate;
        //this.managedUsersCount = managedUsersCount;
        //this.round = round;
        this.status = status;
        this.isRunning = isRunning;
        this.rule = rule;
    }
    return Schedule;
}());
exports.Schedule = Schedule;
//# sourceMappingURL=Schedule.js.map