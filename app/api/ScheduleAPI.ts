import {Router, Request, Response} from 'express';
import {scheduleController} from '../controller/ScheduleController';

const router: Router = Router();

router
    .get('/schedule',(req,res)=>{
        let schedule = scheduleController.getSchedule();
        res.send(schedule);
    })
    .post('/schedule',(req,res)=>{
        let rule = req.body;
        scheduleController.starSchedule(rule);
        res.sendStatus(200);
    })
    .delete('/schedule',(req,res)=>{
        scheduleController.stopSchedule();
        res.sendStatus(200);
    });

export const scheduleApiRouter:Router = router;