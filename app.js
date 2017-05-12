var schedule = require('node-schedule');
var fs = require('fs');
var express = require('express');
var path = require('path');
var app = express();
var automation = require('./automation');
var port = process.env.EXPRESS_PORT || 3000;

//app.use(express.static(path.join(__dirname,'snapshot')));

var jobTask;
var cfg = JSON.parse(fs.readFileSync('./conf.json'));

function doAsyncSeries(cfg) {
    var url = cfg.address;
    var accounts = cfg.accounts;
    return accounts.reduce(function (promise, account) {
        return promise.then(function (result) {
            return automation(url,account.username,account.password);
        });
    }, new Promise());
}
app.post('/automation', function (req, res) {
    var rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [1, 3, 5];
    rule.hour = 17;
    rule.minute = 30;
    if (jobTask) {
        jobTask.cancel();
    }
    jobTask = schedule.scheduleJob(rule, function () {
        doAsyncSeries(cfg);
    });
    doAsyncSeries(cfg);
    res.end();
});

app.delete('/automation', function (req, res) {
    if (jobTask) {
        jobTask.cancel();
    }
    res.end();
});

app.get('/automation', function (req, res) {
    res.sendStatus(200);
});

app.listen(port, function () {
    console.log('catw_auto_2 is runningf on port %d', port);
});