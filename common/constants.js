function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}

define('SCHEDULE_STATUS_WAITING','waiting');
define('SCHEDULE_STATUS_FINISHED_WAITING','finished_waiting');
define('SCHEDULE_STATUS_RUNNING','running');
define('SCHEDULE_STATUS_BROKENDOWN','brokendown');