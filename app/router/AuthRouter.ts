import {Router, Request, Response} from 'express';
import * as request from 'request';
const router: Router = Router();


let clientId:string = 'application';
let secret:string = 'secret';
export function authRouter(){
    router
    .get('/session', (req, res) => {
        if(req.session.token){
            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    })
    .delete('/session',(req,res) => {
        if(req.session.token){
            delete req.session.token;
        }
        res.sendStatus(200);
    })
    .post('/session',(req,res)=>{
        if(req.session.token){
            res.sendStatus(200);
        }else{
            var username = req.body.username;
            var password = req.body.password;
            let authorizaton = 'Basic ' + Buffer.from(clientId+':'+secret).toString('base64');
            console.log(authorizaton);
            request({
                'url':req.protocol + '://' + req.get('host') + '/oauth/token',
                'method':'POST',
                'headers':{
                    'Authorization':authorizaton,
                },
                'form':{
                    'grant_type':'password',
                    'username':username,
                    'password':password
                }
            },function(err,response,data){
                if(err){
                    res.sendStatus(403);
                }else{
                    data = JSON.parse(data);
                    var sessionId = req.session.id;
                    console.log(data);
                    req.session.token = data;
                    res.sendStatus(200);
                }
            });
        }
        
    })
    return router;
};