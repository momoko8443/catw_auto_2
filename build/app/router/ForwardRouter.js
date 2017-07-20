"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var request = require("request");
var router = express_1.Router();
function forwardRouter(req, res, next) {
    var url = req.protocol + '://' + req.get('host') + '/api' + req.url;
    console.log('forward to:', url);
    var headers = req.headers;
    if (req.session.token) {
        headers['Authorization'] = 'Bearer ' + req.session.token.access_token;
    }
    var body = [];
    if (req.method === "POST" || req.method === "PATCH" || req.method === "PUT") {
        if (Object.getOwnPropertyNames(req.body).length > 0) {
            buildForwardRequest(req.body);
        }
        else {
            buildForwardRequest(null);
        }
    }
    else {
        buildForwardRequest(null);
    }
    function buildForwardRequest(body) {
        var opt = { 'url': url, 'headers': headers, 'method': req.method, 'json': true };
        if (body) {
            opt['body'] = body;
        }
        var forwardRequest = request(opt, function (err, response, body) {
            if (err) {
                console.error('error', err);
                next();
            }
            else {
                res.send(body);
            }
        });
    }
}
exports.forwardRouter = forwardRouter;
;
//# sourceMappingURL=ForwardRouter.js.map