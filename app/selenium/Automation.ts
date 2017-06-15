
import { customPhantom as phantomjs } from './PhantomjsCapability';
import * as fs from 'fs';
import * as webdriver from 'selenium-webdriver';
import * as proxy from 'selenium-webdriver/proxy';

let By = webdriver.By;
let until = webdriver.until;


export class Automation {
    private driver: webdriver.WebDriver;

    private loadLoginPage(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.driver.get(url);
            this.driver.wait(until.elementLocated(By.id('sap-client')), 20000)
                .then(function () {
                    resolve();
                }).catch(function (e) {
                    reject();
                });
        });
    }

    private login(username: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let sap_client = this.driver.findElement(By.id('sap-client'));
            let sap_user = this.driver.findElement(By.id('sap-user'));
            let sap_password = this.driver.findElement(By.id('sap-password'));
            let sap_language_dropdown = this.driver.findElement(By.id('sap-language-dropdown'));
            let login_button = this.driver.findElement(By.id('LOGON_BUTTON'));

            sap_client.sendKeys('800');
            sap_user.sendKeys(username);
            sap_password.sendKeys(password);
            this.driver.executeScript('document.getElementById("sap-language").value = "ZH"');
            sap_language_dropdown.sendKeys('Chinese');

            login_button.click();

            this.driver.wait(until.titleIs('DXC-IC'), 10000).then(() => {
                resolve();
            }).catch((e) => {
                reject({ code: 401, message: 'login failed' });
            });
        });
    }

    private gotoTimesheet(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.driver.switchTo().frame('list');
            this.driver.findElement(By.id('time_entry')).click();
            this.driver.switchTo().defaultContent();
            this.driver.switchTo().frame('right');
            this.driver.findElement(By.id('callprivacy')).click();
            this.driver.findElement(By.id('SaveButton')).isDisplayed().then((result) => {
                if (result) {
                    resolve();
                } else {
                    reject();
                }
            });
        });
    }

    private copyAndSaveTimesheet(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.driver.findElement(By.id('PWeekButton')).click();
            this.driver.findElement(By.id('CopyToFutu')).click();
            this.driver.findElement(By.id('SaveButton')).click();
            this.driver.findElements(By.css('span>font')).then((elements) => {
                if(elements.length === 1){
                    elements[0].getText().then((result) => {
                        if (result === 'Data has been saved.') {
                            resolve();
                        } else {
                            reject();
                        }
                    });
                }else{
                    reject({ code: 400, message: 'timesheet of previous week is invalid' });
                }
            });      
        });
    }

    private snapshoot(name): void {
        this.driver.takeScreenshot().then(function (data) {
            name += '.png';
            var screenshotPath = 'public/snapshoot/';
            fs.writeFileSync(screenshotPath + name, data, 'base64');
        });
    }

    execute(url: string, username: string, password: string) {
        return new Promise((resolve, reject) => {
            this.driver = new webdriver.Builder()
                .withCapabilities(phantomjs)
                .setProxy(proxy.manual({ http: 'web-proxy.houston.hpecorp.net:8080' }))
                .build();
            console.log(username, 'automation task is running');
            let today = new Date().toISOString().slice(0, 10);
            this.loadLoginPage(url)
                .then(() => {
                    console.log('load login page success');
                    return this.login(username, password);
                 })
                .then(() => {
                    console.log('login success');
                    return this.gotoTimesheet();
                })
                .then(() => {
                    console.log('save timesheet success');
                    return this.copyAndSaveTimesheet();
                })
                .then(() => {
                    let fileName = username + '_' + 'success_' + today;
                    this.snapshoot(fileName);
                    this.driver.quit();
                    console.log('success ' + today + ' ' + username);
                    resolve(fileName+'.png');
                }).catch((err) => {
                    console.error('CATW_AUTO_2', err);
                    let fileName = username + '_' + 'failed_' + today;
                    this.snapshoot(fileName);
                    this.driver.quit();
                    reject(fileName+'.png');
                });
        });
    }
}

//export const automation:Automation = new Automation();


