import * as express from 'express';
import * as session from 'express-session';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import {scheduleApiRouter} from './api/ScheduleAPI';
import {userApiRouter} from './api/UserAPI';
import * as OAuth2Server from 'oauth2-server';
import {model} from './auth/AuthModel';
import {authRouter} from './router/AuthRouter';
import {forwardRouter} from './router/ForwardRouter';

const app: express.Application = express();

const port: number = process.env.PORT || 3000;

app.use(session({
  secret: 'catw',
  saveUninitialized: true,
  resave: false,
  cookie:{
    maxAge: 1800000,
    secure: false
  }
}));

app.use(express.static(path.join(__dirname,'../../public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app['oauth'] = OAuth2Server({
	model: model,
	grants: ['password', 'client_credentials'],
	debug: true
});

app.all('/oauth/token', app['oauth'].grant());
app.use('/auth',authRouter());
app.use('/client',forwardRouter);
app.use('/api',userApiRouter(app));
app.use('/api',scheduleApiRouter(app));

app.use(app['oauth'].errorHandler());

app.listen(port, ()=>{
    console.log(`Listening at http://localhost:${port}/`);
});