import {Router, Request, Response} from 'express';

const router: Router = Router();

router
    .get('/schedule',function(req,res){
        res.send('ok');
    })
    .post('/schedule',function(req,res){

    })
    .delete('/schedule',function(req,res){

    });

export const scheduleApiRouter:Router = router;