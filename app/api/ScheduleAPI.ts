import {Router, Request, Response} from 'express';
import {scheduleController} from '../controller/ScheduleController';

const router: Router = Router();

export function scheduleApiRouter(app){
    router
    .get('/schedule',(req,res)=>{
        let schedule = scheduleController.getSchedule();
        res.send(schedule);
    })
    .post('/schedule',app['oauth'].authorise(),(req,res)=>{
        let rule = req.body;
        scheduleController.starSchedule(rule);
        res.sendStatus(200);
    })
    .delete('/schedule',app['oauth'].authorise(),(req,res)=>{
        scheduleController.stopSchedule();
        res.sendStatus(200);
    });
    return router;
};