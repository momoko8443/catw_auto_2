"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router
    .get('/schedule', function (req, res) {
    res.send('ok');
})
    .post('/schedule', function (req, res) {
})
    .delete('/schedule', function (req, res) {
});
exports.scheduleApiRouter = router;
