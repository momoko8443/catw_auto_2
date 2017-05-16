var express = require('express');
module.export = function(server){
    var router = express.Router();

    router.post('/automation/:username',function(req,res){
        var username = req.params.username;
        if(username){
            var account = findAccount(username);
            if(account){
                automation(cfg.address,account.username,account.password)
                .then(function(){
                    
                });
            }
        }else{
            doAsyncSeries(cfg);
        }
        res.sendStatus(200);
    });

    server.use('/api',router);

};