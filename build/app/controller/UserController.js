"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../model/User");
var UserDAO_1 = require("../database/UserDAO");
var Constants_1 = require("../common/Constants");
var UserController = (function () {
    function UserController() {
    }
    UserController.prototype.getUsers = function () {
        return UserDAO_1.userDAO.findAll();
    };
    UserController.prototype.getUser = function (username) {
        return UserDAO_1.userDAO.find(username);
    };
    UserController.prototype.syncManagedUsers = function (users) {
        var existUsers = UserDAO_1.userDAO.query(Constants_1.USER_STATUS.ENABLED);
        existUsers.forEach(function (existUser) {
            var needRemove = true;
            users.forEach(function (user) {
                if (user.username === existUser.username) {
                    needRemove = false;
                    return false;
                }
            });
            UserDAO_1.userDAO.delete(existUser.username);
        });
        users.forEach(function (user) {
            user = new User_1.User(user.username, user.password, user.displayName);
            var existUser = UserDAO_1.userDAO.find(user.username);
            if (existUser) {
                UserDAO_1.userDAO.update(user);
            }
            else {
                UserDAO_1.userDAO.add(user);
            }
        });
    };
    return UserController;
}());
exports.userController = new UserController();
//# sourceMappingURL=UserController.js.map