"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ScheduleDAO_1 = require("../database/ScheduleDAO");
var Constants_1 = require("../common/Constants");
var AutomationController_1 = require("../controller/AutomationController");
var UserDAO_1 = require("../database/UserDAO");
var ScheduleTask = require("node-schedule");
var ScheduleController = (function () {
    function ScheduleController() {
    }
    ScheduleController.prototype.starSchedule = function (_rule) {
        var currentSchedule = ScheduleDAO_1.scheduleDAO.find();
        currentSchedule['startDate'] = new Date();
        currentSchedule['status'] = Constants_1.SCHEDULE_STATUS.START;
        currentSchedule['rule'] = _rule;
        ScheduleDAO_1.scheduleDAO.update(currentSchedule);
        var rule = new ScheduleTask.RecurrenceRule();
        rule.dayOfWeek = _rule.dayOfWeek;
        rule.hour = _rule.hour;
        rule.minute = _rule.minute;
        if (this.jobTask) {
            this.jobTask.cancel();
        }
        this.jobTask = ScheduleTask.scheduleJob(rule, function () {
            var users = UserDAO_1.userDAO.findAll();
            AutomationController_1.automationController.batchExecute(users);
        });
    };
    ScheduleController.prototype.stopSchedule = function () {
        var currentSchedule = ScheduleDAO_1.scheduleDAO.find();
        currentSchedule['status'] = Constants_1.SCHEDULE_STATUS.STOP;
        ScheduleDAO_1.scheduleDAO.update(currentSchedule);
        if (this.jobTask) {
            this.jobTask.cancel();
        }
    };
    ScheduleController.prototype.getSchedule = function () {
        return ScheduleDAO_1.scheduleDAO.find();
    };
    return ScheduleController;
}());
exports.scheduleController = new ScheduleController();
//# sourceMappingURL=ScheduleController.js.map