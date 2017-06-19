import * as assert from 'assert';
import * as fs from 'fs';
import {config} from '../../app/common/Config';
import {SCHEDULE_STATUS} from '../../app/common/Constants';
import {userController} from '../../app/controller/UserController';
import {userDAO} from '../../app/database/UserDAO';
import {User} from '../../app/model/User';

describe('test cases for schedule.dao.js',  () =>{
    let db_file:string = 'build/db/schedule.json';
    before(function () {
        if (fs.existsSync(db_file)) {
            userDAO.clean();
        }
    });
    it('should sync users successfully',()=>{
        let users:Array<User> = config.users as Array<User>;
        let count:number = users.length;
        userController.syncManagedUsers(users);
        let existUsers:Array<User> = userDAO.findAll() as Array<User>;
        assert.equal(existUsers.length, count);
    });
});