import * as assert from 'assert';
import {scheduleDAO} from '../../app/database/ScheduleDAO';
import * as fs from 'fs';
import {SCHEDULE_STATUS} from '../../app/common/Constants';
import {Schedule} from '../../app/model/Schedule';
import {Rule} from '../../app/model/Rule';


describe('test cases for schedule.dao.js',  () =>{
    let db_file:string = 'build/db/schedule.json';
    before(function () {
        if (fs.existsSync(db_file)) {
            scheduleDAO.clean();
        }
    });
    it('should update schedule successfully',()=>{
        var rule = new Rule([3],17,30);
        var update_schedule = new Schedule(new Date(),SCHEDULE_STATUS.START,false,rule);
        scheduleDAO.update(update_schedule);
        let schedule = scheduleDAO.find();
     
        assert.equal(schedule['status'],SCHEDULE_STATUS.START);
        update_schedule['status'] = SCHEDULE_STATUS.STOP;
        scheduleDAO.update(update_schedule);
        assert.equal(schedule['status'],SCHEDULE_STATUS.STOP);
    });
});