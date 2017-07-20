import { Router, Request, Response } from 'express';
import * as request from 'request';
const router: Router = Router();

export function forwardRouter(req, res, next) {
    let url = req.protocol + '://' +req.get('host') + '/api' + req.url;
    console.log('forward to:', url);
    let headers = req.headers;
    if (req.session.token) {
        headers['Authorization'] = 'Bearer ' + req.session.token.access_token;
    }
    let body:any = [];
    if(req.method === "POST" || req.method === "PATCH" || req.method === "PUT"){   
        if(Object.getOwnPropertyNames(req.body).length > 0 ){
            buildForwardRequest(req.body);
        }else{
            buildForwardRequest(null);
        }
        
    }else{
        buildForwardRequest(null);
    }
    function buildForwardRequest(body){
        let opt = { 'url': url, 'headers': headers, 'method': req.method ,'json':true};
        if(body){
            opt['body'] = body;
        }
        let forwardRequest = request(opt,function(err,response,body){
            if(err){
                console.error('error',err)
                next();
            }else{
                res.send(body);
            }
        }); 
    }
    
};