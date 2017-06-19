"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var fs = require("fs");
var Config_1 = require("../../app/common/Config");
var UserController_1 = require("../../app/controller/UserController");
var UserDAO_1 = require("../../app/database/UserDAO");
describe('test cases for schedule.dao.js', function () {
    var db_file = 'build/db/schedule.json';
    before(function () {
        if (fs.existsSync(db_file)) {
            UserDAO_1.userDAO.clean();
        }
    });
    it('should sync users successfully', function () {
        var users = Config_1.config.users;
        var count = users.length;
        UserController_1.userController.syncManagedUsers(users);
        var existUsers = UserDAO_1.userDAO.findAll();
        assert.equal(existUsers.length, count);
    });
});
//# sourceMappingURL=user.controller.spec.js.map