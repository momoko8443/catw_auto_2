var fs = require('fs');
var automation = require('./automation');

var cfg = JSON.parse(fs.readFileSync('./conf.json'));

automation(cfg.address,cfg.accounts[0].username,cfg.accounts[0].password).then(function(){
    console.log('success');
});