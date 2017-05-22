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
        var update_schedule = new Schedule_1.Schedule(new Date(), Constants_1.SCHEDULE_STATUS.START, false, rule);
        ScheduleDAO_1.scheduleDAO.update(update_schedule);
        var schedule = ScheduleDAO_1.scheduleDAO.find();
        assert.equal(schedule.status, Constants_1.SCHEDULE_STATUS.START);
        update_schedule.status = Constants_1.SCHEDULE_STATUS.STOP;
        ScheduleDAO_1.scheduleDAO.update(update_schedule);
        assert.equal(schedule.status, Constants_1.SCHEDULE_STATUS.STOP);
    });
});
//# sourceMappingURL=schedule.dao.spec.js.map