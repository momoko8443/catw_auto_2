import low = require('Lowdb');
import {User} from '../model/User';
import {Task} from '../model/Task';
import {USER_STATUS} from '../common/Constants';

class UserDAO{
    private db:low;
    
    constructor(){
        this.db = low('build/db/users.json');
        this.db.defaults({ users: [] }).write();
    }
    add(user:User):boolean{
        let exist = this.find(user.username);
        if (!exist) {
            this.db.get('users')
                .push(user).write();
            return true;
        } else {
            return false;
        }
    }

    find(username:string){
        let db_user = this.db_find(username);
        if (db_user) {
            return db_user.value();
        } else {
            return ;
        }
    }

    findAll(){
        return this.db.get('users').value();
    }

    query(filterStatus:USER_STATUS){
        return this.db.get('users').filter({status:filterStatus}).value();
    }

    private db_find(username:string):any{
        return this.db.get('users').find({ username: username });
    }

    update(user:User):boolean{
        let exist = this.db_find(user.username);
        if (exist.value()) {
            exist.assign(user).write();
            return true;
        } else {
            return false;
        }
    }

    delete(username):boolean{
        let exist = this.db_find(username);
        if (exist.value()) {
            this.db.get('users').remove({ username: username }).write();
            return true;
        } else {
            return false;
        }
    }

    pushTask(username:string, task:Task):boolean{
        let exist = this.db_find(username);
        if (exist.value()) {
            exist.get('tasks').push(task).write();
            return true;
        } else {
            return false;
        }
    }

    popTask(username:string):boolean{
        let exist = this.db_find(username);
        if (exist.value()) {
            exist.get('tasks').pop().write();
            return true;
        }else{
            return false;
        }
    }

    clean():void{
        this.db.set('users', []).write();
    }
}
let userDAO = new UserDAO();

export {userDAO} ;