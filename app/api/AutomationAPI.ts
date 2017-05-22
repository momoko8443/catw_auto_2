import {Router, Request, Response} from 'express';
import {automationController} from '../controller/AutomationController';

const router: Router = Router();

router
    .post('automation',(req,res) =>{
        
    })
    .post('/automation/:username',(req, res)=>{
    let username = req.params.username;
    if(username){
        automationController.executeImmediately(username);
        res.sendStatus(200);
    }else{
        res.sendStatus(404);
    }
});


export const automationApiRouter:Router = router;