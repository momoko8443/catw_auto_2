var schedule = require('node-schedule');

function ScheduleController(){
    var jobTask;

    this.createScheduleTask = function(plan){
        var rule = new schedule.RecurrenceRule();
        Object.assign(rule,plan);  
        if (jobTask) {
            jobTask.cancel();
        }
        jobTask = schedule.scheduleJob(rule, function () {
            //doAsyncSeries(cfg);
        });
    };
}

module.exports = new ScheduleController();