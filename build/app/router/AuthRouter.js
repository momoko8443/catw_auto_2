"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var request = require("request");
var router = express_1.Router();
var clientId = 'application';
var secret = 'secret';
function authRouter() {
    router
        .post('/session', function (req, res) {
        if (req.session.token) {
            res.sendStatus(200);
        }
        else {
            var username = req.body.username;
            var password = req.body.password;
            var authorizaton = 'Basic ' + Buffer.from(clientId + ':' + secret).toString('base64');
            console.log(authorizaton);
            request({
                'url': req.protocol + '://' + req.get('host') + '/oauth/token',
                'method': 'POST',
                'headers': {
                    'Authorization': authorizaton,
                },
                'form': {
                    'grant_type': 'password',
                    'username': username,
                    'password': password
                }
            }, function (err, response, data) {
                if (err) {
                    res.sendStatus(403);
                }
                else {
                    data = JSON.parse(data);
                    var sessionId = req.session.id;
                    console.log(data);
                    req.session.token = data;
                    res.sendStatus(200);
                }
            });
        }
    });
    return router;
}
exports.authRouter = authRouter;
;
//# sourceMappingURL=AuthRouter.js.map