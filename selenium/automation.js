
var chrome = require('selenium-webdriver/chrome');
var phantomjs = require('./capability.phantomjs');
var proxy = require('selenium-webdriver/proxy');
var By = webdriver.By;
var until = webdriver.until;
var driver;

function loadLoginPage(url) {
    return new Promise(function (resolve, reject) {
        driver.get(url);
        driver.wait(until.elementLocated(By.id('sap-client')), 20000)
            .then(function () {
                resolve();
            }).catch(function (e) {
                reject();
            });
    });
}

function login(username, password) {
    return new Promise(function (resolve, reject) {
        var sap_client = driver.findElement(By.id('sap-client'));
        var sap_user = driver.findElement(By.id('sap-user'));
        var sap_password = driver.findElement(By.id('sap-password'));
        var sap_language_dropdown = driver.findElement(By.id('sap-language-dropdown'));
        var login_button = driver.findElement(By.id('LOGON_BUTTON'));

        sap_client.sendKeys('800');
        sap_user.sendKeys(username);
        sap_password.sendKeys(password);
        driver.executeScript('document.getElementById("sap-language").value = "ZH"');
        sap_language_dropdown.sendKeys('Chinese');

        login_button.click();

        driver.wait(until.titleIs('HPE-IC'), 10000).then(function () {
            resolve();
        }).catch(function (e) {
            reject({ code: 401, message: 'login failed' });
        });
    });
}

function gotoTimesheet() {
    return new Promise(function (resolve, reject) {
        driver.switchTo().frame('list');
        driver.findElement(By.id('time_entry')).click();
        driver.switchTo().defaultContent();
        driver.switchTo().frame('right');
        driver.findElement(By.id('callprivacy')).click();
        driver.findElement(By.id('SaveButton')).isDisplayed().then(function (result) {
            if (result) {
                resolve();
            } else {
                reject();
            }
        });
    });
}

function CopyAndSaveTimesheet() {
    return new Promise(function (resolve, reject) {
        driver.findElement(By.id('PWeekButton')).click();
        driver.findElement(By.id('CopyToFutu')).click();
        driver.findElement(By.id('DateButton')).click();
        driver.findElement(By.id('SaveButton')).click();
        driver.findElement(By.css('span>font')).getText().then(function (result) {
            if (result === 'Data has been saved.') {
                resolve();
            } else {
                reject();
            }
        });
    });
}

function snapshoot(name) {
    driver.takeScreenshot().then(function (data) {
        name += '.png';
        var screenshotPath = 'public/snapshoot/';
        fs.writeFileSync(screenshotPath + name, data, 'base64');
    });
}

module.exports = function (url, username, password) {

    return new Promise(function (resolve, reject) {
        driver = new webdriver.Builder()
            //.forBrowser('chrome')
            .withCapabilities(phantomjs)
            .setProxy(proxy.manual({http: 'web-proxy.houston.hpecorp.net:8080'}))
            .build();
        console.log(username, 'automation task is running');
        var today = new Date().toISOString().slice(0, 10);
        loadLoginPage(url).then(function () {
                console.log('load login page success');
                return login(username, password);
            })
            .then(function () {
                console.log('login success');
                return gotoTimesheet();
            })
            .then(function () {
                console.log('save timesheet success');
                return CopyAndSaveTimesheet();
            })
            .then(function () {
                snapshoot(username + '_' + 'success_' + today);
                driver.quit();
                console.log('success ' + today + ' ' + username);
                resolve();
            }).catch(function (err) {
                console.error('CATW_AUTO_2', err);
                snapshoot(username + '_' + 'failed_' + today);
                driver.quit();
                reject(err);
            });
    });
}


