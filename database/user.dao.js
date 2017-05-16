var low = require('lowdb');
var fs = require('fs');

function UserDAO() {
    var db = low('database/db/users.json');
    db.defaults({ users: [] }).write();

    this.add = function (user) {
        var exist = this.find(user.username);
        if (!exist) {
            db.get('users')
                .push({ username: user.username, password: user.password, displayName: user.displayName, tasks: [] }).write();
            return true;
        } else {
            return false;
        }
    };

    this.find = function (username) {
        var db_user = db_find(username);
        if (db_user) {
            return db_user.value();
        } else {
            return null;
        }
    };

    this.findAll = function () {
        return db.get('users').value();
    };

    function db_find(username) {
        var user = db.get('users').find({ username: username });
        return user;
    }

    this.update = function (user) {
        var exist = db_find(user.username);
        if (exist.value()) {
            exist.assign({ password: user.password, displayName: user.displayName }).write();
            return true;
        } else {
            return false;
        }
    };

    this.delete = function (username) {
        var exist = db_find(username);
        if (exist.value()) {
            db.get('users').remove({ username: username }).write();
            return true;
        } else {
            return false;
        }
    };

    this.pushTask = function (username, task) {
        var exist = db_find(username);
        if (exist.value()) {
            exist.get('tasks').push(task).write()
            return true;
        } else {
            return false;
        }
    };

    this.clean = function () {
        db.set('users', []).write();
    };
}
module.exports = new UserDAO();