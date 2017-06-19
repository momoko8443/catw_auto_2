"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserDAO_1 = require("../database/UserDAO");
var Config_1 = require("../common/Config");
var Automation_1 = require("../selenium/Automation");
var Constants_1 = require("../common/Constants");
var Task_1 = require("../model/Task");
var ScheduleDAO_1 = require("../database/ScheduleDAO");
var AutomationController = (function () {
    function AutomationController(url) {
        this.url = url;
    }
    AutomationController.prototype.executeImmediately = function (username) {
        // improve to Promise mode;
        var user = UserDAO_1.userDAO.find(username);
        if (user && !user.isRunning) {
            UserDAO_1.userDAO.update({ username: user.username, isRunning: true });
            var automation = new Automation_1.Automation();
            automation.execute(this.url, user.username, user.password).then(function (result) {
                UserDAO_1.userDAO.update({ username: user.username, isRunning: false });
                var task = new Task_1.Task(new Date(), Constants_1.TASK_STATUS.SUCCESS, 'success', result);
                UserDAO_1.userDAO.pushTask(username, task);
            }).catch(function (err) {
                UserDAO_1.userDAO.update({ username: user.username, isRunning: false });
                var task = new Task_1.Task(new Date(), Constants_1.TASK_STATUS.FAILED, 'failed', err);
                UserDAO_1.userDAO.pushTask(username, task);
            });
        }
        else {
            return;
        }
    };
    AutomationController.prototype.batchExecute = function (users) {
        var currentSchedule = ScheduleDAO_1.scheduleDAO.find();
        if (!currentSchedule.isRunning) {
            currentSchedule.isRunning = true;
            ScheduleDAO_1.scheduleDAO.update(currentSchedule);
            this.doParallel(this.url, users).then(function (result) {
                currentSchedule.isRunning = false;
                ScheduleDAO_1.scheduleDAO.update(currentSchedule);
            }).catch(function (err) {
                currentSchedule.isRunning = false;
                ScheduleDAO_1.scheduleDAO.update(currentSchedule);
            });
        }
    };
    AutomationController.prototype.doParallel = function (url, users) {
        return new Promise(function (resolve, reject) {
            var promiseArray = [];
            users.forEach(function (user) {
                var automation = new Automation_1.Automation();
                promiseArray.push(automation.execute(url, user.username, user.password));
            });
            Promise.all(promiseArray)
                .then(function (result) {
                resolve();
            }).catch(function (err) {
                reject();
            });
        });
    };
    AutomationController.prototype.doAsyncSeries = function (url, users) {
        return users.reduce(function (promise, user) {
            return promise.catch(function (error) {
                return;
            }).then(function (result) {
                var automation = new Automation_1.Automation();
                return automation.execute(url, user.username, user.password);
            });
        }, new Promise(function (resolve, reject) {
            resolve();
        }));
    };
    return AutomationController;
}());
exports.automationController = new AutomationController(Config_1.config.url);
//# sourceMappingURL=AutomationController.js.map