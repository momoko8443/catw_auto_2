import * as assert from 'assert';
import {scheduleDAO} from './database/ScheduleDAO';
import * as fs from 'fs';
import {SCHEDULE_STATUS} from './common/Constants';
import {Schedule} from './model/Schedule';
import {Rule} from './model/Rule';
import {User} from './model/User';
import {userDAO} from './database/UserDAO';


let db_file:string = 'build/db/schedule.json';

if (fs.existsSync(db_file)) {

    let currentSchedule:Schedule = scheduleDAO.find() as Schedule;
    if(currentSchedule) {
        currentSchedule.status = SCHEDULE_STATUS.STOP;
        currentSchedule.isRunning = false;
        scheduleDAO.update(currentSchedule);
    }
}

let db_file_2:string = 'build/db/users.json';

if (fs.existsSync(db_file_2)) {
    let users:Array<User> = userDAO.findAll() as Array<User>;
    if(users && users.length > 0){
        users.forEach((user) => {
            if(user.isRunning){
                user.isRunning = false;
                userDAO.update(user);
            }
        })
    }
}