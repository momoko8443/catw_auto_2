"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Schedule = (function () {
    function Schedule(startDate, managedUsersCount, round, status, rule) {
        this.startDate = startDate;
        this.managedUsersCount = managedUsersCount;
        this.round = round;
        this.status = status;
        this.rule = rule;
    }
    return Schedule;
}());
exports.Schedule = Schedule;
