"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PhantomjsCapability_1 = require("./PhantomjsCapability");
var fs = require("fs");
var webdriver = require("selenium-webdriver");
var proxy = require("selenium-webdriver/proxy");
var By = webdriver.By;
var until = webdriver.until;
var Automation = (function () {
    function Automation() {
    }
    Automation.prototype.loadLoginPage = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.driver.get(url);
            _this.driver.wait(until.elementLocated(By.id('sap-client')), 20000)
                .then(function () {
                resolve();
            }).catch(function (e) {
                reject();
            });
        });
    };
    Automation.prototype.login = function (username, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var sap_client = _this.driver.findElement(By.id('sap-client'));
            var sap_user = _this.driver.findElement(By.id('sap-user'));
            var sap_password = _this.driver.findElement(By.id('sap-password'));
            var sap_language_dropdown = _this.driver.findElement(By.id('sap-language-dropdown'));
            var login_button = _this.driver.findElement(By.id('LOGON_BUTTON'));
            sap_client.sendKeys('800');
            sap_user.sendKeys(username);
            sap_password.sendKeys(password);
            _this.driver.executeScript('document.getElementById("sap-language").value = "ZH"');
            sap_language_dropdown.sendKeys('Chinese');
            login_button.click();
            _this.driver.wait(until.titleIs('HPE-IC'), 10000).then(function () {
                resolve();
            }).catch(function (e) {
                reject({ code: 401, message: 'login failed' });
            });
        });
    };
    Automation.prototype.gotoTimesheet = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.driver.switchTo().frame('list');
            _this.driver.findElement(By.id('time_entry')).click();
            _this.driver.switchTo().defaultContent();
            _this.driver.switchTo().frame('right');
            _this.driver.findElement(By.id('callprivacy')).click();
            _this.driver.findElement(By.id('SaveButton')).isDisplayed().then(function (result) {
                if (result) {
                    resolve();
                }
                else {
                    reject();
                }
            });
        });
    };
    Automation.prototype.copyAndSaveTimesheet = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.driver.findElement(By.id('PWeekButton')).click();
            _this.driver.findElement(By.id('CopyToFutu')).click();
            _this.driver.findElement(By.id('DateButton')).click();
            _this.driver.findElement(By.id('SaveButton')).click();
            _this.driver.findElement(By.css('span>font')).getText().then(function (result) {
                if (result === 'Data has been saved.') {
                    resolve();
                }
                else {
                    reject();
                }
            });
        });
    };
    Automation.prototype.snapshoot = function (name) {
        this.driver.takeScreenshot().then(function (data) {
            name += '.png';
            var screenshotPath = 'public/snapshoot/';
            fs.writeFileSync(screenshotPath + name, data, 'base64');
        });
    };
    Automation.prototype.execute = function (url, username, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.driver = new webdriver.Builder()
                .withCapabilities(PhantomjsCapability_1.customPhantom)
                .setProxy(proxy.manual({ http: 'web-proxy.houston.hpecorp.net:8080' }))
                .build();
            console.log(username, 'automation task is running');
            var today = new Date().toISOString().slice(0, 10);
            _this.loadLoginPage(url)
                .then(function () {
                console.log('load login page success');
                return _this.login(username, password);
            })
                .then(function () {
                console.log('login success');
                return _this.gotoTimesheet();
            })
                .then(function () {
                console.log('save timesheet success');
                return _this.copyAndSaveTimesheet();
            })
                .then(function () {
                var fileName = username + '_' + 'success_' + today;
                _this.snapshoot(fileName);
                _this.driver.quit();
                console.log('success ' + today + ' ' + username);
                resolve(fileName + '.png');
            }).catch(function (err) {
                console.error('CATW_AUTO_2', err);
                var fileName = username + '_' + 'failed_' + today;
                _this.snapshoot(fileName);
                _this.driver.quit();
                reject(fileName + '.png');
            });
        });
    };
    return Automation;
}());
exports.Automation = Automation;
//export const automation:Automation = new Automation();
//# sourceMappingURL=Automation.js.map