"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var low = require("Lowdb");
var UserDAO = (function () {
    function UserDAO() {
        this.db = low('build/db/users.json');
        this.db.defaults({ users: [] }).write();
    }
    UserDAO.prototype.add = function (user) {
        var exist = this.find(user.username);
        if (!exist) {
            this.db.get('users')
                .push(user).write();
            return true;
        }
        else {
            return false;
        }
    };
    UserDAO.prototype.find = function (username) {
        var db_user = this.db_find(username);
        if (db_user) {
            return db_user.value();
        }
        else {
            return;
        }
    };
    UserDAO.prototype.findAll = function () {
        return this.db.get('users').value();
    };
    UserDAO.prototype.query = function (filterStatus) {
        return this.db.get('users').filter({ status: filterStatus }).value();
    };
    UserDAO.prototype.db_find = function (username) {
        return this.db.get('users').find({ username: username });
    };
    UserDAO.prototype.update = function (user) {
        var exist = this.db_find(user.username);
        if (exist.value()) {
            exist.assign(user).write();
            return true;
        }
        else {
            return false;
        }
    };
    UserDAO.prototype.delete = function (username) {
        var exist = this.db_find(username);
        if (exist.value()) {
            this.db.get('users').remove({ username: username }).write();
            return true;
        }
        else {
            return false;
        }
    };
    UserDAO.prototype.pushTask = function (username, task) {
        var exist = this.db_find(username);
        if (exist.value()) {
            exist.get('tasks').push(task).write();
            return true;
        }
        else {
            return false;
        }
    };
    UserDAO.prototype.popTask = function (username) {
        var exist = this.db_find(username);
        if (exist.value()) {
            exist.get('tasks').pop().write();
            return true;
        }
        else {
            return false;
        }
    };
    UserDAO.prototype.clean = function () {
        this.db.set('users', []).write();
    };
    return UserDAO;
}());
var userDAO = new UserDAO();
exports.userDAO = userDAO;
//# sourceMappingURL=UserDAO.js.map