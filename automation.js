var webdriver = require('selenium-webdriver');
var phantomjs = require('selenium-webdriver/phantomjs');
var By = webdriver.By;
var until = webdriver.until;
var driver;

function loadLoginPage(url){
    return new Promise(function(resolve,reject){
        driver.get(url);
        driver.wait(until.elementLocated(By.id('sap-client')), 20000)
        .then(function(){
            resolve();
        }).catch(function(e){
            reject();
        });
    });
}

function login(username, password) {
    return new Promise(function (resolve, reject) {
        try{       
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

            driver.wait(until.titleIs('HPE-IC'), 20000).then(function(){
                resolve();
            }).catch(function(e){
                reject();
            });
        }catch(e){
            console.error('CATW_AUTO_2',e);
            reject();
        }
    });
}

function gotoTimesheet() {
    return new Promise(function (resolve, reject) {
        try{
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
        }catch(e){
            console.error('CATW_AUTO_2',e);
            reject();
        } 
    });
}

function CopyAndSaveTimesheet() {
    return new Promise(function (resolve, reject) {
        try{
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
        }catch(e){
            console.error('CATW_AUTO_2',e);
            reject();
        }
    });
}

module.exports = function (url,username, password) {
    
    return new Promise(function (resolve, reject) {
        try{
            driver = new webdriver.Builder()
            //.usingServer('http://c9t24575.itcs.hpecorp.net:32772/wd/hub')
            .forBrowser('phantomjs')
            .build();
            console.log(username,'automation task is running');
            loadLoginPage(url).then(function(){
                console.log('load login page success');
                return login(username, password);
            }).then(function () {
                    console.log('login success');
                    return gotoTimesheet();
                })
                .then(function () {
                    console.log('save timesheet success');
                    return CopyAndSaveTimesheet();
                })
                .then(function () {
                    driver.quit();
                    console.log('success '+ new Date() + ' ' + username);
                    resolve();
                }).catch(function (err) {
                    console.error('CATW_AUTO_2',err);
                    driver.quit();
                    reject();
                });
        }catch(e){
            reject();
        }
    });
}


