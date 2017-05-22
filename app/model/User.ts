import {Task} from './Task';
import {USER_STATUS} from './../common/Constants'
export class User{
    username: string;
    password: string;
    displayName: string;
    status: USER_STATUS;
    tasks: Array<Task>;
    isRunning:boolean;

    constructor(username: string, password: string, displayName:string,status:USER_STATUS = USER_STATUS.ENABLED,tasks:Array<Task> = [],isRunning:boolean = false) {
        this.username = username;
        this.password = password;
        this.displayName = displayName;
        this.status = status;
        this.tasks = tasks;
        this.isRunning = isRunning;
    }
}