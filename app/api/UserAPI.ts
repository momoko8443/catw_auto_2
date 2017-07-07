import {Router, Request, Response} from 'express';
import {userController} from '../controller/UserController';
import {automationController} from '../controller/AutomationController';
import {User} from '../model/User';
import {config} from '../common/Config';
import {userDAO} from '../database/UserDAO';
import * as express from 'express';
const router: Router = Router();



export function userApiRouter(app:any){
    router
    .post('/users',(req,res)=>{
        
    })
    .post('/users/batch',app['oauth'].authorise(),(req,res)=>{
       let users = userDAO.findAll();
        automationController.batchExecute(users);
        res.sendStatus(200); 
    })
    .put('/users/sync',app['oauth'].authorise(),(req,res)=>{
        let users = config.users as Array<User>;
        userController.syncManagedUsers(users);
        res.sendStatus(200);
    })
    .get('/users',(req,res)=>{
        let users = userController.getUsers();
        res.send(users);
    })
    .get('/users/:username',(req,res)=>{
        let username = req.params.username;
        if(username){
            res.send(userController.getUser(username));
        }else{
            res.sendStatus(404);
        };
    })
    .post('/users/:username/tasks',app['oauth'].authorise(),(req,res)=> {
        let username = req.params.username;
        automationController.executeImmediately(username);
        res.sendStatus(200);
    })
    .put('/users',(req,res)=>{

    })
    .delete('/users/:username',app['oauth'].authorise(),(req,res)=>{

    });
    return router;
}
    