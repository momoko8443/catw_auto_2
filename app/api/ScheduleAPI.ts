import {Router, Request, Response} from 'express';

const router: Router = Router();

router
    .get('/schedule',(req,res)=>{
        res.send('ok');
    })
    .post('/schedule',(req,res)=>{

    })
    .delete('/schedule',(req,res)=>{

    });

export const scheduleApiRouter:Router = router;