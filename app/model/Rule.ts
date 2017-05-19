export class Rule{
    dayOfWeek:Array<number>;
    hour:number;
    minute:number;
    
    constructor(dayOfWeek,hour,minute){
        this.dayOfWeek = dayOfWeek;
        this.hour = hour;
        this.minute = minute;
    }
}