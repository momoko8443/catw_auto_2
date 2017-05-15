var webdriver = require('selenium-webdriver');
var phantomjs_exe = require('phantomjs-prebuilt').path;
var customPhantom = webdriver.Capabilities.phantomjs();
customPhantom.set("phantomjs.binary.path", phantomjs_exe);
customPhantom.set('phantomjs.cli.args', ['--web-security=no', '--ssl-protocol=any', '--ignore-ssl-errors=true']);
customPhantom.set('phantomjs.page.settings.userAgent','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36');
customPhantom.set('phantomjs.page.settings.javascriptEnabled',true);
customPhantom.set('phantomjs.page.settings.loadImages',true);
customPhantom.set('phantom.cookiesEnabled',true);
customPhantom.set('phantom.javascriptEnabled',true);

var chrome = require('selenium-webdriver/chrome');
var proxy = require('selenium-webdriver/proxy');
var fs = require('fs');
var By = webdriver.By;
var until = webdriver.until;
var driver;

driver = new webdriver.Builder()
    .withCapabilities(customPhantom)
    //.forBrowser('chrome')
    .setProxy(proxy.manual({http: 'web-proxy.houston.hpecorp.net:8080'}))
    .build();

driver.get('https://e4u0129.houston.entsvcs.net:4102/hps-ic-red(bD16aCZjPTgwMCZ0PVpIUFNfSUM=)/default.htm');
driver.wait(until.titleContains('Logon'),60000).then(function(){
    driver.takeScreenshot().then(function (data) {
        var name = 'ss1.png';
        var screenshotPath = 'public/snapshoot/';
        fs.writeFileSync(screenshotPath + name, data, 'base64');
    });
}).catch(function(e){
    console.error(e);
});


