var express = require('express');
module.export = function(server){
    var router = express.Router();

    router.get('/schedule',function(req,res){
        /* return:
            {
                startDate:xxxx,
                latestRunDate:xxxx,
                nextRunDate:xxxx,
                managedUsersCount:xxx,
                roundCount:xxx
            }
         */
    });

    router.post('/schedule',function(req,res){
        
    });

    router.delete('/schedule',function(req,res){

    });

    server.use('/api',router);

};