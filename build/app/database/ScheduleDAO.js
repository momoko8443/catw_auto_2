"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var low = require("Lowdb");
var ScheduleDAO = (function () {
    function ScheduleDAO() {
        this.db = low('build/db/schedule.json');
        this.db.defaults({ schedule: {} }).write();
    }
    ScheduleDAO.prototype.find = function () {
        return this.db.get('schedule').value();
    };
    ScheduleDAO.prototype.update = function (schedule) {
        this.db.get('schedule').assign({
            startDate: schedule.startDate,
            latestRunDate: schedule.previousDate,
            managedUsersCount: schedule.managedUsersCount,
            roundCount: schedule.round,
            status: schedule.status,
            rule: schedule.rule
        }).write();
    };
    ;
    ScheduleDAO.prototype.clean = function () {
        this.db.set('schedule', {}).write();
    };
    ;
    return ScheduleDAO;
}());
var scheduleDAO = new ScheduleDAO();
exports.scheduleDAO = scheduleDAO;
