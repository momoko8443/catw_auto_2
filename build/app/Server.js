"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var session = require("express-session");
var path = require("path");
var bodyParser = require("body-parser");
var ScheduleAPI_1 = require("./api/ScheduleAPI");
var UserAPI_1 = require("./api/UserAPI");
var OAuth2Server = require("oauth2-server");
var AuthModel_1 = require("./auth/AuthModel");
var AuthRouter_1 = require("./router/AuthRouter");
var ForwardRouter_1 = require("./router/ForwardRouter");
var app = express();
var port = process.env.PORT || 3000;
app.use(session({
    secret: 'catw',
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 1800000,
        secure: false
    }
}));
app.use(express.static(path.join(__dirname, '../../public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app['oauth'] = OAuth2Server({
    model: AuthModel_1.model,
    grants: ['password', 'client_credentials'],
    debug: true
});
app.all('/oauth/token', app['oauth'].grant());
app.use('/auth', AuthRouter_1.authRouter());
app.use('/client', ForwardRouter_1.forwardRouter);
app.use('/api', UserAPI_1.userApiRouter(app));
app.use('/api', ScheduleAPI_1.scheduleApiRouter(app));
app.use(app['oauth'].errorHandler());
app.listen(port, function () {
    console.log("Listening at http://localhost:" + port + "/");
});
//# sourceMappingURL=Server.js.map