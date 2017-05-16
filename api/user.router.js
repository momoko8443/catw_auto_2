var express = require('express');
module.export = function(server){
    var router = express.Router();
    
    router.post('/users',function(req,res){
        
    });

    router.get('/users/:username',function(req,res){

    });

    router.put('/users',function(req,res){

    });

    router.delete('/users/:username',function(req,res){

    });

    router.post('/users/:username/tasks',function(req,res){
        
    });


    server.use('/api',router);

};