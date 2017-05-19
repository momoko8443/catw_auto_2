"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router
    .post('/users', function (req, res) {
})
    .get('/users/:username', function (req, res) {
    res.send(req.params.username);
})
    .put('/users', function (req, res) {
})
    .delete('/users/:username', function (req, res) {
})
    .post('/users/:username/tasks', function (req, res) {
});
exports.userApiRouter = router;
