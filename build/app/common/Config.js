"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Config = (function () {
    function Config() {
        var config = JSON.parse(fs.readFileSync('conf.json', 'utf-8'));
        this.url = config.address;
        this.users = config.accounts;
    }
    return Config;
}());
exports.config = new Config();
//# sourceMappingURL=Config.js.map