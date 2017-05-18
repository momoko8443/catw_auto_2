var low = require('lowdb');
var fs = require('fs');

function ScheduleDAO() {
    var db = low('database/db/schedule.json');
    db.defaults({ schedule: {} }).write();

    this.find = function () {
        return db.get('schedule').value();
    };

    this.update = function (schedule) {
        db.get('schedule').assign(
            {
                startDate:schedule.startDate,
                latestRunDate:schedule.latestRunDate,
                managedUsersCount:schedule.managedUsersCount,
                roundCount:schedule.roundCount,
                status:schedule.status,
                rule:schedule.rule
            }).write();
    };

    this.clean = function () {
        db.set('schedule', {}).write();
    };
}
module.exports = new ScheduleDAO();