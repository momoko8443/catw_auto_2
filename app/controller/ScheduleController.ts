import {scheduleDAO} from '../database/ScheduleDAO';
import {Rule} from '../model/Rule';
import {Schedule} from '../model/Schedule';
import {SCHEDULE_STATUS} from '../common/Constants';
import {automationController} from '../controller/AutomationController';
import {userDAO} from '../database/UserDAO';

import * as ScheduleTask from 'node-schedule';
class ScheduleController{
    private jobTask;
    starSchedule(_rule:Rule){
        let currentSchedule = scheduleDAO.find();
        currentSchedule.startDate = new Date();
        currentSchedule.status = SCHEDULE_STATUS.START;
        currentSchedule.rule = _rule;
        scheduleDAO.update(currentSchedule);

        let rule = new ScheduleTask.RecurrenceRule();
        rule.dayOfWeek = _rule.dayOfWeek;
        rule.hour = _rule.hour;
        rule.minute = _rule.minute;
        if (this.jobTask) {
            this.jobTask.cancel();
        }
        this.jobTask = ScheduleTask.scheduleJob(rule,  ()=> {
            let users = userDAO.findAll();
            automationController.batchExecute(users);
        });

    }

    stopSchedule(){
        let currentSchedule = scheduleDAO.find();
        currentSchedule.status = SCHEDULE_STATUS.STOP;
        scheduleDAO.update(currentSchedule);
        if (this.jobTask) {
            this.jobTask.cancel();
        }
    }

    getSchedule():Schedule{
        return scheduleDAO.find();
    }
}

export const scheduleController:ScheduleController = new ScheduleController();