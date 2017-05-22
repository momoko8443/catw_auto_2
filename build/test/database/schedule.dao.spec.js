"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var ScheduleDAO_1 = require("../../app/database/ScheduleDAO");
var fs = require("fs");
var Constants_1 = require("../../app/common/Constants");
var Schedule_1 = require("../../app/model/Schedule");
var Rule_1 = require("../../app/model/Rule");
describe('test cases for schedule.dao.js', function () {
    var db_file = 'build/db/schedule.json';
    before(function () {
        if (fs.existsSync(db_file)) {
            ScheduleDAO_1.scheduleDAO.clean();
        }
    });
    it('should update schedule successfully', function () {
        var rule = new Rule_1.Rule([3], 17, 30);
        var update_schedule = new Schedule_1.Schedule(new Date(), 12, 0, Constants_1.SCHEDULE_STATUS.WAITING, rule);
        ScheduleDAO_1.scheduleDAO.update(update_schedule);
        var schedule = ScheduleDAO_1.scheduleDAO.find();
        assert.equal(schedule.managedUsersCount, 12);
        assert.equal(schedule.status, Constants_1.SCHEDULE_STATUS.WAITING);
        update_schedule.managedUsersCount = 13;
        update_schedule.round = 1;
        ScheduleDAO_1.scheduleDAO.update(update_schedule);
        assert.equal(schedule.managedUsersCount, 13);
    });
});
//# sourceMappingURL=schedule.dao.spec.js.map