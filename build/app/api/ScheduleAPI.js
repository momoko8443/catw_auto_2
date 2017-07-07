"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ScheduleController_1 = require("../controller/ScheduleController");
var router = express_1.Router();
function scheduleApiRouter(app) {
    router
        .get('/schedule', function (req, res) {
        var schedule = ScheduleController_1.scheduleController.getSchedule();
        res.send(schedule);
    })
        .post('/schedule', app['oauth'].authorise(), function (req, res) {
        var rule = req.body;
        ScheduleController_1.scheduleController.starSchedule(rule);
        res.sendStatus(200);
    })
        .delete('/schedule', app['oauth'].authorise(), function (req, res) {
        ScheduleController_1.scheduleController.stopSchedule();
        res.sendStatus(200);
    });
    return router;
}
exports.scheduleApiRouter = scheduleApiRouter;
;
//# sourceMappingURL=ScheduleAPI.js.map