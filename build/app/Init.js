"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ScheduleDAO_1 = require("./database/ScheduleDAO");
var fs = require("fs");
var Constants_1 = require("./common/Constants");
var UserDAO_1 = require("./database/UserDAO");
var db_file = 'build/db/schedule.json';
if (fs.existsSync(db_file)) {
    var currentSchedule = ScheduleDAO_1.scheduleDAO.find();
    if (currentSchedule) {
        currentSchedule.status = Constants_1.SCHEDULE_STATUS.STOP;
        currentSchedule.isRunning = false;
        ScheduleDAO_1.scheduleDAO.update(currentSchedule);
    }
}
var db_file_2 = 'build/db/users.json';
if (fs.existsSync(db_file_2)) {
    var users = UserDAO_1.userDAO.findAll();
    if (users && users.length > 0) {
        users.forEach(function (user) {
            if (user.isRunning) {
                user.isRunning = false;
                UserDAO_1.userDAO.update(user);
            }
        });
    }
}
//# sourceMappingURL=Init.js.map