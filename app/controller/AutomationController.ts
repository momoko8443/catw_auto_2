import {userDAO} from '../database/UserDAO';
import {config} from '../common/Config';
import {Rule} from '../model/Rule';
import {User} from '../model/User';
import {Automation} from '../selenium/Automation';
import {TASK_STATUS} from '../common/Constants';
import {Task} from '../model/Task';
import {scheduleDAO} from '../database/ScheduleDAO';
import {Schedule} from '../model/Schedule';
class AutomationController{
    private url:string;
    constructor(url:string){
        this.url = url;
    }

    executeImmediately(username:string){
        // improve to Promise mode;
        let user = userDAO.find(username);
        if(user && !user.isRunning){
            userDAO.update({username:user.username,isRunning:true} as User);
            let automation = new Automation();
            automation.execute(this.url,user.username,user.password).then((result)=>{
                userDAO.update({username:user.username,isRunning:false} as User);
                let task = new Task(new Date(),TASK_STATUS.SUCCESS,'success',result as string);
                userDAO.pushTask(username,task);
            }).catch((err)=>{
                userDAO.update({username:user.username,isRunning:false} as User);
                let task = new Task(new Date(),TASK_STATUS.FAILED,'failed',err as string);
                userDAO.pushTask(username,task);
            });
        }else{
            return;
        }
    }

    batchExecute(users){
        let currentSchedule = scheduleDAO.find();
        if(!currentSchedule['isRunning']){
            currentSchedule['isRunning'] = true;
            scheduleDAO.update(currentSchedule as Schedule);
            this.doParallel(this.url,users).then((result)=>{
                currentSchedule['isRunning'] = false;
                scheduleDAO.update(currentSchedule as Schedule);
            }).catch((err)=>{
                currentSchedule['isRunning'] = false;
                scheduleDAO.update(currentSchedule as Schedule);
            });
        }
    }

    private doParallel(url,users){
        return new Promise((resolve, reject)=>{
            let promiseArray:Array<any> = [];
            users.forEach((user) => {
                let automation = new Automation();
                promiseArray.push(automation.execute(url,user.username,user.password));
            });
            Promise.all(promiseArray)
            .then((result)=>{
                resolve();

            }).catch((err)=>{
                reject();
            });
        });
    }


    private  doAsyncSeries(url,users) {
        return users.reduce(function (promise, user) {
            return promise.catch(function(error){
                return;
            }).then(function (result) {
                let automation = new Automation();
                return automation.execute(url,user.username,user.password);
            });
        }, new Promise(function(resolve,reject){
            resolve();
        }));
    }
}


export const automationController:AutomationController = new AutomationController(config.url);