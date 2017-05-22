import {userDAO} from '../database/UserDAO';
import {config} from '../common/Config';
import {Rule} from '../model/Rule';
import {User} from '../model/User';
import {Automation} from '../selenium/Automation';
import {TASK_STATUS} from '../common/Constants';
import {Task} from '../model/Task';

class AutomationController{
    private url:string;
    constructor(url:string){
        this.url = url;
    }

    executeImmediately(username:string){
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

        this.doAsyncSeries(this.url,users);
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