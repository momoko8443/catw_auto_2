var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var By = webdriver.By;
var until = webdriver.until;
var driver;

function login(url,username, password) {
    return new Promise(function (resolve, reject) {
        driver.get(url);
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

        driver.switchTo().frame('list');
        driver.findElement(By.id('time_entry')).isDisplayed().then(function (result) {
            if (result) {
                resolve();
            } else {
                reject();
            }
        });
    });
}

function gotoTimesheet() {
    return new Promise(function (resolve, reject) {
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

module.exports = function (url,username, password) {
    driver = new webdriver.Builder()
    .usingServer('http://c9t24575.itcs.hpecorp.net:32768/wd/hub')
    .forBrowser('chrome')
    .build();

    return new Promise(function (resolve, reject) {
        login(url,username, password)
            .then(function () {
                return gotoTimesheet();
            })
            .then(function () {
                return CopyAndSaveTimesheet();
            })
            .then(function () {
                driver.quit();
                console.log('success'+ new Date() + username);
                resolve();
            }).catch(function (err) {
                console.log(err);
                reject();
            });
    });
}


