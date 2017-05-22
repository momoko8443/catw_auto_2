"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var UserDAO_1 = require("../../app/database/UserDAO");
var fs = require("fs");
var User_1 = require("../../app/model/User");
var Task_1 = require("../../app/model/Task");
var Constants_1 = require("../../app/common/Constants");
describe('test cases for user.dao.js', function () {
    var db_file = 'build/db/users.json';
    before(function () {
        if (fs.existsSync(db_file)) {
            UserDAO_1.userDAO.clean();
        }
    });
    it('should add user successfully', function () {
        var old_count = JSON.parse(fs.readFileSync(db_file, 'utf-8')).users.length;
        var user = new User_1.User('60075098', '2017.May', 'Huibin, Zheng');
        var result = UserDAO_1.userDAO.add(user);
        var new_count = JSON.parse(fs.readFileSync(db_file, 'utf-8')).users.length;
        assert.equal(new_count, old_count + 1);
        assert.equal(result, true);
        var result2 = UserDAO_1.userDAO.add(user);
        var latest_count = JSON.parse(fs.readFileSync(db_file, 'utf-8')).users.length;
        assert.equal(new_count, latest_count);
        assert.equal(result2, false);
    });
    it('should find user by username successfully', function () {
        var user = UserDAO_1.userDAO.find('60075098');
        assert.equal(user.username, '60075098');
        var user2 = UserDAO_1.userDAO.find('60075099');
        assert.equal(user2, null);
    });
    it('should update user successfully', function () {
        var update_user = new User_1.User('60075098', '2017.May', 'momoko');
        var result = UserDAO_1.userDAO.update(update_user);
        var user = UserDAO_1.userDAO.find('60075098');
        assert.equal(user.displayName, 'momoko');
        assert.equal(result, true);
        var update_user2 = new User_1.User('60075099', '2017.May', 'sakura');
        var result2 = UserDAO_1.userDAO.update(update_user2);
        assert.equal(result2, false);
        assert.equal(user.displayName, 'momoko');
    });
    it('should push task successfully', function () {
        var task = new Task_1.Task(new Date(), Constants_1.TASK_STATUS.SUCCESS, 'save timesheet success', 'xxx.png'); //runDate:Date,status:TASK_STATUS,message:strin
        var result = UserDAO_1.userDAO.pushTask('60075098', task);
        assert.equal(result, true);
        var user = UserDAO_1.userDAO.find('60075098');
        assert.equal(user.tasks.length, 1);
        var result2 = UserDAO_1.userDAO.pushTask('60075099', task);
        assert.equal(result2, false);
    });
    it('should pop task successfully', function () {
        var count1 = UserDAO_1.userDAO.find('60075098').tasks.length;
        UserDAO_1.userDAO.popTask('60075098');
        var count2 = UserDAO_1.userDAO.find('60075098').tasks.length;
        assert.equal(count1 - 1, count2);
        var result = UserDAO_1.userDAO.popTask('60075098');
        assert.equal(result, true);
    });
    it('should find all users successfully', function () {
        var users = UserDAO_1.userDAO.findAll();
        assert.equal(users.length, 1);
    });
    it('should query by status successfully', function () {
        var user = new User_1.User('60075100', '2017.May', 'Jake, Zheng', Constants_1.USER_STATUS.DISABLED);
        var result = UserDAO_1.userDAO.add(user);
        assert.equal(result, true);
        var latest_count = JSON.parse(fs.readFileSync(db_file, 'utf-8')).users.length;
        var filterUsers = UserDAO_1.userDAO.query(Constants_1.USER_STATUS.ENABLED);
        assert.equal(filterUsers.length, latest_count - 1);
    });
    it('should delete user successfully', function () {
        var old_count = JSON.parse(fs.readFileSync(db_file, 'utf-8')).users.length;
        var result = UserDAO_1.userDAO.delete('60075099');
        var new_count = JSON.parse(fs.readFileSync(db_file, 'utf-8')).users.length;
        assert.equal(result, false);
        assert.equal(old_count, new_count);
        var result2 = UserDAO_1.userDAO.delete('60075098');
        var lastest_count = JSON.parse(fs.readFileSync(db_file, 'utf-8')).users.length;
        assert.equal(result2, true);
        assert.equal(lastest_count, new_count - 1);
    });
    it('should clean all users successfully', function () {
        UserDAO_1.userDAO.clean();
        var count = JSON.parse(fs.readFileSync(db_file, 'utf-8')).users.length;
        assert.equal(count, 0);
    });
});
//# sourceMappingURL=user.dao.spec.js.map