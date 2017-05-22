import * as fs from 'fs';
class Config{
    url:string;
    users:Array<object>;

    constructor(){
        let config = JSON.parse(fs.readFileSync('conf.json','utf-8'));
        this.url = config.address;
        this.users = config.accounts;
    }
}

export const config:Config = new Config();
