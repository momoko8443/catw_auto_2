import {Rule} from './Rule';
import {SCHEDULE_STATUS} from '../common/Constants';
export class Schedule{
    startDate:Date;
    //previousDate:Date;
    //nextDate:Date;
    //managedUsersCount:number;
    //round:number;
    status:SCHEDULE_STATUS;
    isRunning:boolean;
    rule:Rule;

    constructor(startDate,status,isRunning,rule){
        this.startDate = startDate;
        //this.managedUsersCount = managedUsersCount;
        //this.round = round;
        this.status = status;
        this.isRunning = isRunning;
        this.rule = rule;
    }
}