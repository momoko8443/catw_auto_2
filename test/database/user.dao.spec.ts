import * as assert from 'assert';

import {userDAO} from '../../app/database/UserDAO';
import * as fs from 'fs';
import {User} from '../../app/model/User';
import {Task} from '../../app/model/Task';
import {TASK_STATUS,USER_STATUS} from '../../app/common/Constants';


describe('test cases for user.dao.js', () => {
    let db_file = 'build/db/users.json';
    before(() => {
        if (fs.existsSync(db_file)) {
            userDAO.clean();
        }
    });

    it('should add user successfully', () => {
        let old_count = JSON.parse(fs.readFileSync(db_file,'utf-8')).users.length;
        let user = new User('60075098','2017.May','Huibin, Zheng');
        let result = userDAO.add(user);
        let new_count = JSON.parse(fs.readFileSync(db_file,'utf-8')).users.length;
        assert.equal(new_count, old_count + 1);
        assert.equal(result, true);

        let result2 = userDAO.add(user);
        let latest_count = JSON.parse(fs.readFileSync(db_file,'utf-8')).users.length;
        assert.equal(new_count, latest_count);
        assert.equal(result2, false);
    });

    it('should find user by username successfully', () => {
        let user:User = userDAO.find('60075098');
        assert.equal(user.username, '60075098');
        let user2 = userDAO.find('60075099');
        assert.equal(user2, null);
    });

    it('should update user successfully', () => {
        let update_user = new User('60075098', '2017.May', 'momoko');
        let result = userDAO.update(update_user);
        let user:User = userDAO.find('60075098');
        assert.equal(user.displayName, 'momoko');
        assert.equal(result, true);

        let update_user2 = new User('60075099', '2017.May', 'sakura');
        let result2 = userDAO.update(update_user2);
        assert.equal(result2, false);
        assert.equal(user.displayName, 'momoko');
    });

    it('should push task successfully', () =>{
        let task = new Task(new Date(),TASK_STATUS.SUCCESS,'save timesheet success','xxx.png');//runDate:Date,status:TASK_STATUS,message:strin
        let result = userDAO.pushTask('60075098',task);
        assert.equal(result, true);
        let user:User = userDAO.find('60075098');
        assert.equal(user.tasks.length, 1);
        let result2 = userDAO.pushTask('60075099',task);
        assert.equal(result2, false);
    });

    it('should pop task successfully', ()=>{
        let count1 = userDAO.find('60075098').tasks.length;
        userDAO.popTask('60075098');
        let count2 = userDAO.find('60075098').tasks.length;
        assert.equal(count1 - 1, count2);
        let result = userDAO.popTask('60075098');
        assert.equal(result, true);
    });

    it('should find all users successfully', () =>{
        let users:Array<User> = userDAO.findAll();
        assert.equal(users.length, 1);
    });

    it('should query by status successfully', () => {
        let user = new User('60075100','2017.May','Jake, Zheng',USER_STATUS.DISABLED);
        let result = userDAO.add(user);
        assert.equal(result, true);
        let latest_count = JSON.parse(fs.readFileSync(db_file,'utf-8')).users.length;
        let filterUsers:Array<User> = userDAO.query(USER_STATUS.ENABLED);
        assert.equal(filterUsers.length, latest_count-1);
    });


    it('should delete user successfully', () => {
        let old_count = JSON.parse(fs.readFileSync(db_file,'utf-8')).users.length;
        let result = userDAO.delete('60075099');
        let new_count = JSON.parse(fs.readFileSync(db_file,'utf-8')).users.length;
        assert.equal(result, false);
        assert.equal(old_count, new_count);
        let result2 = userDAO.delete('60075098');
        let lastest_count = JSON.parse(fs.readFileSync(db_file,'utf-8')).users.length;
        assert.equal(result2, true);
        assert.equal(lastest_count, new_count - 1);
    });

    it('should clean all users successfully', () =>{
        userDAO.clean();
        let count = JSON.parse(fs.readFileSync(db_file,'utf-8')).users.length;
        assert.equal(count, 0);

    })
});