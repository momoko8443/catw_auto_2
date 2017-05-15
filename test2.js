var webdriver = require('selenium-webdriver');
var phantomjs_exe = require('phantomjs-prebuilt').path;
var customPhantom = webdriver.Capabilities.phantomjs();
customPhantom.set("phantomjs.binary.path", phantomjs_exe);
var proxy = require('selenium-webdriver/proxy');
var fs = require('fs');
var By = webdriver.By;
var until = webdriver.until;
var driver;

driver = new webdriver.Builder()
    .withCapabilities(customPhantom)
    .setProxy(proxy.manual({http: 'web-proxy.houston.hpecorp.net:8080'}))
    .build();

driver.get('https://e4u0129.houston.entsvcs.net:4102/hps-ic-red(bD16aCZjPTgwMCZ0PVpIUFNfSUM=)/default.htm');
driver.wait(until.titleContains('Logon'),20000).then(function(){
    driver.takeScreenshot().then(function (data) {
        var name = 'ss1.png';
        var screenshotPath = 'public/snapshoot/';
        fs.writeFileSync(screenshotPath + name, data, 'base64');
    });
}).catch(function(e){
    console.error(e);
});


