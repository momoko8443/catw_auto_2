"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AutomationController_1 = require("../controller/AutomationController");
var router = express_1.Router();
router
    .post('automation', function (req, res) {
})
    .post('/automation/:username', function (req, res) {
    var username = req.params.username;
    if (username) {
        AutomationController_1.automationController.executeImmediately(username);
        res.sendStatus(200);
    }
    else {
        res.sendStatus(404);
    }
});
exports.automationApiRouter = router;
//# sourceMappingURL=AutomationAPI.js.map