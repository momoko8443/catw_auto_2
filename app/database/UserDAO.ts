import * as low from 'Lowdb';
import {User} from '../model/User';
import {Task} from '../model/Task';

class UserDAO{
    private db:low;
    
    constructor(){
        this.db = low('build/db/users.json');
        this.db.defaults({ users: [] }).write();
    }
    add(user:User) {
        let exist = this.find(user.username);
        if (!exist) {
            this.db.get('users')
                .push({ username: user.username, password: user.password, displayName: user.displayName, tasks: [] }).write();
            return true;
        } else {
            return false;
        }
    }

    find(username:string) {
        let db_user = this.db_find(username);
        if (db_user) {
            return db_user.value();
        } else {
            return null;
        }
    }

    findAll() {
        return this.db.get('users').value();
    }

    private db_find(username:string) {
        return this.db.get('users').find({ username: username });
    }

    update(user:User) {
        let exist = this.db_find(user.username);
        if (exist.value()) {
            exist.assign({ password: user.password, displayName: user.displayName }).write();
            return true;
        } else {
            return false;
        }
    }

    delete(username) {
        let exist = this.db_find(username);
        if (exist.value()) {
            this.db.get('users').remove({ username: username }).write();
            return true;
        } else {
            return false;
        }
    }

    pushTask(username:string, task:Task) {
        let exist = this.db_find(username);
        if (exist.value()) {
            exist.get('tasks').push(task).write()
            return true;
        } else {
            return false;
        }
    }

    clean() {
        this.db.set('users', []).write();
    }
}
let userDAO = new UserDAO();

export {userDAO} ;