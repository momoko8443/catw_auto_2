import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import {scheduleApiRouter} from './api/ScheduleAPI';
import {userApiRouter} from './api/UserAPI';

const app: express.Application = express();

const port: number = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,'../public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/api',userApiRouter);
app.use('/api',scheduleApiRouter);


app.listen(port, ()=>{
    console.log(`Listening at http://localhost:${port}/`);
});