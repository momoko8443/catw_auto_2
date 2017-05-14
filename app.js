var schedule = require('node-schedule');
var fs = require('fs');
var express = require('express');
var path = require('path');
var app = express();
var automation = require('./automation');
var port = process.env.EXPRESS_PORT || 3000;

app.use(express.static(path.join(__dirname,'public')));

var jobTask;
var cfg = JSON.parse(fs.readFileSync('./conf.json'));

function doAsyncSeries(cfg) {
    var url = cfg.address;
    var accounts = cfg.accounts;
    return accounts.reduce(function (promise, account) {
        return promise.then(function (result) {
            return automation(url,account.username,account.password);
        });
    }, new Promise(function(resolve,reject){
        resolve();
    }));
}

app.post('/automation',function(req,res){
    doAsyncSeries(cfg);
    res.sendStatus();
});

app.post('/automation/schedule', function (req, res) {
    var rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [3];
    rule.hour = 17;
    rule.minute = 30;
    if (jobTask) {
        jobTask.cancel();
    }
    jobTask = schedule.scheduleJob(rule, function () {
        doAsyncSeries(cfg);
    });
    res.sendStatus();
});

app.delete('/automation/schedule', function (req, res) {
    if (jobTask) {
        jobTask.cancel();
    }
    res.end();
});

app.get('/automation/schedule', function (req, res) {
    res.sendStatus(200);
});

app.listen(port, function () {
    console.log('catw_auto_2 is runningf on port %d', port);
});