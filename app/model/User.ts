import {Task} from './Task';
export class User{
    username: string;
    password: string;
    displayName: string;
    tasks: Array<Task>;

    constructor(username: string, password: string, displayName:string) {
        this.username = username;
        this.password = password;
        this.displayName = displayName;
    }
}