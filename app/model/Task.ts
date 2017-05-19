import {TASK_STATUS} from '../common/Constants';

export class Task{
    runDate:Date;
    status:TASK_STATUS;
    message:string;
    snapshoot:string;
    constructor(runDate:Date,status:TASK_STATUS,message:string,snapshoot:string){
        this.runDate = runDate;
        this.status = status;
        this.message = message;
        this.snapshoot = snapshoot;
    }
}