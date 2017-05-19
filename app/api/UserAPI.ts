import {Router, Request, Response} from 'express';

const router: Router = Router();

router
    .post('/users',function(req,res){
        
    })
    .get('/users/:username',function(req,res){
        res.send(req.params.username);
    })
    .put('/users',function(req,res){

    })
    .delete('/users/:username',function(req,res){

    })
    .post('/users/:username/tasks',function(req,res){
        
    });

export const userApiRouter:Router = router;