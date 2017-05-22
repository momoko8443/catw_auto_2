"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = require("../controller/UserController");
var AutomationController_1 = require("../controller/AutomationController");
var Config_1 = require("../common/Config");
var router = express_1.Router();
router
    .post('/users', function (req, res) {
})
    .post('/users/batch', function (req, res) {
    var users = req.body;
})
    .put('/users/sync', function (req, res) {
    var users = Config_1.config.users;
    UserController_1.userController.syncManagedUsers(users);
    res.sendStatus(200);
})
    .get('/users', function (req, res) {
    var users = UserController_1.userController.getUsers();
    res.send(users);
})
    .get('/users/:username', function (req, res) {
    var username = req.params.username;
    if (username) {
        res.send(UserController_1.userController.getUser(username));
    }
    else {
        res.sendStatus(404);
    }
    ;
})
    .post('/users/:username/tasks', function (req, res) {
    var username = req.params.username;
    AutomationController_1.automationController.executeImmediately(username);
    res.sendStatus(200);
})
    .put('/users', function (req, res) {
})
    .delete('/users/:username', function (req, res) {
});
exports.userApiRouter = router;
//# sourceMappingURL=UserAPI.js.map