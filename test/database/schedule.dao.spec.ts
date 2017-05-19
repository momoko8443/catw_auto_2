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
        var update_schedule = new Schedule(new Date(),12,0,SCHEDULE_STATUS.WAITING,rule);
        scheduleDAO.update(update_schedule);
        let schedule = scheduleDAO.find();
        assert.equal(schedule.managedUsersCount,12);
        assert.equal(schedule.status,SCHEDULE_STATUS.WAITING);
        update_schedule.managedUsersCount = 13;
        update_schedule.round = 1;
        scheduleDAO.update(update_schedule);
        assert.equal(schedule.managedUsersCount,13);
    });
});