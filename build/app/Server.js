"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var ScheduleAPI_1 = require("./api/ScheduleAPI");
var UserAPI_1 = require("./api/UserAPI");
var app = express();
var port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', UserAPI_1.userApiRouter);
app.use('/api', ScheduleAPI_1.scheduleApiRouter);
app.listen(port, function () {
    console.log("Listening at http://localhost:" + port + "/");
});
