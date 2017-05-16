var assert = require('assert');
var userDAO = require('../../database/user.dao');
var fs = require('fs');

describe('test cases for user.dao.js', function () {
    var db_file = 'database/db/users.json';
    before(function () {
        if (fs.existsSync(db_file)) {
            userDAO.clean();
        }
    });

    it('should add user successfully', function () {
        var old_count = JSON.parse(fs.readFileSync(db_file)).users.length;
        var result = userDAO.add({ username: 60075098, password: '2017.May', displayName: 'Huibin, Zheng' });
        var new_count = JSON.parse(fs.readFileSync(db_file)).users.length;
        assert.equal(new_count, old_count + 1);
        assert.equal(result, true);

        var result2 = userDAO.add({ username: 60075098, password: '2017.May', displayName: 'Huibin, Zheng' });
        var latest_count = JSON.parse(fs.readFileSync(db_file)).users.length;
        assert.equal(new_count, latest_count);
        assert.equal(result2, false);
    });

    it('should find user by username successfully', function () {
        var user = userDAO.find(60075098);
        assert.equal(user.username, 60075098);
        var user2 = userDAO.find(60075099);
        assert.equal(user2, null);
    });

    it('should update user successfully', function () {
        var result = userDAO.update({ username: 60075098, password: '2017.May', displayName: 'momoko' });
        var user = userDAO.find(60075098);
        assert.equal(user.displayName, 'momoko');
        assert.equal(result, true);

        var result2 = userDAO.update({ username: 60075099, password: '2017.May', displayName: 'sakura' });
        assert.equal(result2, false);
        assert.equal(user.displayName, 'momoko');
    });

    it('should push task successfully', function(){
        var result = userDAO.pushTask(60075098,{date:new Date(),status:'success',snapshoot:'xxx.png'});
        assert.equal(result, true);
        var user = userDAO.find(60075098);
        assert.equal(user.tasks.length, 1);
        var result2 = userDAO.pushTask(60075099,{date:new Date(),status:'success',snapshoot:'xxx.png'});
        assert.equal(result2, false);
    });

    it('should find all users successfully', function(){
        var users = userDAO.findAll();
        assert.equal(users.length, 1);
    });


    it('should delete user successfully', function () {
        var old_count = JSON.parse(fs.readFileSync(db_file)).users.length;
        var result = userDAO.delete(60075099);
        var new_count = JSON.parse(fs.readFileSync(db_file)).users.length;
        assert.equal(result, false);
        assert.equal(old_count, new_count);
        var result2 = userDAO.delete(60075098);
        var lastest_count = JSON.parse(fs.readFileSync(db_file)).users.length;
        assert.equal(result2, true);
        assert.equal(lastest_count, new_count - 1);
    });

    it('should clean all users successfully', function(){
        userDAO.clean();
        var count = JSON.parse(fs.readFileSync(db_file)).users.length;
        assert.equal(count, 0);

    })
});