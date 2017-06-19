import Lowdb = require('lowdb');
import {Schedule} from '../model/Schedule';

class ScheduleDAO{
    private db:Lowdb;
    constructor(){
        this.db = new Lowdb('build/db/schedule.json');
        this.db.defaults({ schedule: {} }).write();
    }

    find() {
        return this.db.get('schedule').value();
    }

    update(schedule:Schedule) {
        this.db.get('schedule').assign(
            {
                startDate:schedule.startDate,
                // latestRunDate:schedule.previousDate,
                // managedUsersCount:schedule.managedUsersCount,
                // roundCount:schedule.round,
                status:schedule.status,
                isRunning:schedule.isRunning,
                rule:schedule.rule
            }).write();
    };

    clean() {
        this.db.set('schedule', {}).write();
    };
}

let scheduleDAO = new ScheduleDAO();
export {scheduleDAO};