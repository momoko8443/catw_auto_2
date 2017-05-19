import {Rule} from './Rule';
import {SCHEDULE_STATUS} from '../common/Constants';
export class Schedule{
    startDate:Date;
    previousDate:Date;
    nextDate:Date;
    managedUsersCount:number;
    round:number;
    status:SCHEDULE_STATUS;
    rule:Rule;

    constructor(startDate,managedUsersCount,round,status,rule){
        this.startDate = startDate;
        this.managedUsersCount = managedUsersCount;
        this.round = round;
        this.status = status;
        this.rule = rule;
    }
}