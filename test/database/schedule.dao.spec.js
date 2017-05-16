

var assert = require('assert');
var scheduleDAO = require('../../database/schedule.dao');
var fs = require('fs');

describe('test cases for schedule.dao.js', function () {
    var db_file = 'database/db/schedule.json';
    before(function () {
        if (fs.existsSync(db_file)) {
            scheduleDAO.clean();
        }
    });
    it('should update schedule successfully',function(){
        scheduleDAO.update(
            {
                startDate:new Date('2017-05-14'),
                latestRunDate:new Date('2017-05-15'),
                nextRunDate:new Date('2017-05-17'),
                managedUsersCount:12,
                roundCount:1,
                rule:{
                    dayOfWeek:[3],
                    hour:17,
                    minute:30
                }
            });
        var schedule = scheduleDAO.find();
        assert.equal(schedule.managedUsersCount,12);
    });
});