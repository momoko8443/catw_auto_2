/**
 * Created by pengl on 2/23/2017.
 * Description: Log in propel with tenantID = Provider. Upload JSON file, generate new URL
 * Parameters : None
 * Return     : None
 */

// Import libs
const webdriver = require('selenium-webdriver'),
        WebElement = webdriver.WebElement,
        By = webdriver.By,
        until = webdriver.until;

const proxy = require('selenium-webdriver/proxy');

//Set Proxy
var proxyCfg = require('selenium-webdriver/lib/capabilities').ProxyConfig;
proxyCfg = proxy.manual({http: 'web-proxy.houston.hpecorp.net:8080'});//, https: 'web-proxy.houston.hpecorp.net:8080'});
//proxyCfg.sslProxy = 'web-proxy.houston.hpecorp.net:8080';

const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const chromeOptions = new chrome.Options()
        .addArguments('test-type')
        .setProxy( proxyCfg );
const firefoxOptions = new firefox.Options()
        //.setBinary(new firefox.Binary('C:\\Users\\pengl\\Downloads\\firefox-sdk\\bin\\firefox.exe'))
        .setBinary(new firefox.Binary)
        .setProxy( proxyCfg );
const io = require('selenium-webdriver/io');
const path = require('path');
const log = require('loglevel');



//Propel server, account, pwd
const PROPEL_PROD_SERVER = 'https://atcswa-cr-empp.mcloud.svcs.hpe.com';
const PROPEL_PROD_DEMO_SERVER = 'https://atcswa-cr-propel.mcloud.svcs.hpe.com';
const PROPEL_UI_SERVDER = 'https://prop-ui.asiapacific.cpqcorp.net';
const PROPEL_DEV_SERVER = 'https://c4t28533.itcs.hpecorp.net';
const PWD_PROD = 'propel@sara';
const PWD_PROD_DEMO = 'propel+3049';
const PROPEL_SERVER = PROPEL_PROD_SERVER;
var PROPEL_PWD = PWD_PROD;
const TIMEOUT = 120000; //Timeout for Propel page render
const TIMEOUT_ORGCHECK = 10000; //
//const config = require('../config.json');
const remote = require('selenium-webdriver/remote');

//setup custom phantomJS capability
const phantomjs_exe = require('phantomjs-prebuilt').path;
var customPhantom = webdriver.Capabilities.phantomjs();
customPhantom.set("phantomjs.binary.path", phantomjs_exe);
//customPhantom.set("proxy", proxy.manual({http: 'web-proxy.houston.hpecorp.net:8080'}));

var driver;
var PROPEL_ACC ="propel";
var PROPEL_PWD = PWD_PROD;
var g_file = path.resolve('../file/propelUploadJSON_.json');

var importURL = PROPEL_SERVER + ':9200/import/step1';
var webPromise;
var displayName = '';

/***********************************************************
 * Main Process
 * 1) Login Propel with Admin Account
 * 2) Upload file of propelUploadJSON_
 * 3) Activate
 ***********************************************************/
function run(debug, jsonFile) {}

        //init values
        setTraceLevel('debug');

        // return new Promise(function(resovle, reject){
        log.info("****** Step: Create Propel URL in ProPel. ******");


        //if(jsonFile !== undefined && jsonFile.length>0) g_file=jsonFile;

        io.read( g_file )
                .then( function( buffer ) {
                    var obj = JSON.parse( buffer );
                    displayName = obj[0].displayName;
                    log.debug("Customer displayName is :" + displayName );
                });

        //get Propel login Account & PWD
        //PROPEL_ACC = config.propelAccount;
        //PROPEL_PWD = config.propelPassword;
        log.trace("Propel Acc + Pwd is: " + PROPEL_ACC + " " + PROPEL_PWD);

        //Assign WebPromise, instead of native js promise
        driver = new webdriver.Builder()
                /*.withCapabilities({
                    browserName : 'chrome',
                    'firefoxOptions': firefoxOptions,
                    'chromeOptions': chromeOptions
                })*/
                .withCapabilities(customPhantom)
                //.usingServer('http://c9t26321.itcs.hpecorp.net:4444/wd/hub')
                //.usingServer('http://localhost:4444/wd/hub')
                //.forBrowser('chrome').setFirefoxOptions(chromeOptions)
                //.forBrowser('firefox').setFirefoxOptions(firefoxOptions)
                .setProxy(proxy.manual({http: 'web-proxy.houston.hpecorp.net:8080', https: 'web-proxy.houston.hpecorp.net:8080'}))
                .build();

        webPromise = driver.get("https://e4u0129.houston.entsvcs.net:4102/hps-ic-red(bD16aCZjPTgwMCZ0PVpIUFNfSUM=)/default.htm").then( function () {
            log.debug("login now...");
        });

        driver.wait(until.titleContains('Logon'), TIMEOUT_ORGCHECK).then(function () {
            log.debug("Title found");
        }, function err(){
            log.debug("Time OUT");
        });

        //testUpload();
        /*
        webPromise.then( logInPropel )
                .then( uploadJsonFile )
                .then( checkURLCreation )
                .then( enableOrgIdentity )
                .then( tearDown )
                .then( function() {
                    //resovle();
                })
                .catch( function(err){ //check result
                    log.error(  err);
                    tearDown();
                    //reject();
                });*/
    //});
//}

function testUpload() {
    driver.wait(until.titleContains('VPC-RnD'), TIMEOUT);

    driver.findElement(By.xpath('//a[text() = "Sign in"]')).click();


    //log.debug('The current OS is: ' + process.platform)

    //if( serverUrl.length > 1)
    {
        var userLocator = By.id('username');
        driver.wait(until.elementLocated( userLocator), TIMEOUT);
        driver.wait(until.elementIsEnabled( driver.findElement( userLocator)), TIMEOUT);
        driver.findElement(userLocator).sendKeys( "pli@hpe.com" );

        var pwdLocator = By.id('password');
        driver.wait(until.elementLocated( pwdLocator), TIMEOUT);
        driver.wait(until.elementIsEnabled( driver.findElement( pwdLocator)), TIMEOUT);
        driver.findElement(pwdLocator).sendKeys( "Smile@123789" );

        var submitLocator = By.xpath("//input[@type = 'submit' and contains(@value, 'Log on')]");
        driver.wait(until.elementLocated( submitLocator), TIMEOUT);
        driver.wait(until.elementIsVisible( driver.findElement( submitLocator)), TIMEOUT);
        driver.findElement(submitLocator).click().then(function () {
            console.log("Log in Successfully. ");
        });
    }

    driver.get("https://github.houston.entsvcs.net/VPC-RnD/at_propel_config");

    driver.wait(until.titleContains('at_propel_config'), TIMEOUT).then( function () {
        console.log("render to at_propel_config.");
    });

    driver.findElement(By.xpath('//a[contains(text(), "Upload files")]')).click().then( function () {
        console.log("Before: " + g_file);
    });

    driver.wait(until.elementLocated(By.xpath('//input[@type = "file"]')), TIMEOUT);

    driver.findElements(By.xpath('//p[@class = "repo-file-upload-choose"]/input[@type = "file"]')).then( function(eleList){

        uploadPhoto = eleList[0];
        (driver).executeScript("arguments[0].removeAttribute('multiple')",uploadPhoto);
        uploadPhoto.sendKeys(g_file);
    });


    /*driver.findElement(By.xpath('//p[@class = "repo-file-upload-choose"]/input[@type = "file"]')).sendKeys(g_file).then( function () {
        console.log("After: " + g_file);
    });*/

    driver.wait(until.elementLocated(By.xpath('//td[contains(text(), "propelUploadJSON_.json")]')), TIMEOUT);

    driver.findElement(By.xpath('//button[contains(text(), "Commit changes")]')).click();

}

function setTraceLevel( debug ){
    log.setLevel( debug );
}

function logInPropel() {
    driver.wait(until.titleContains('Sign In'), TIMEOUT);

    //Input
    var userLocator = By.id('username');
    driver.wait(until.elementLocated(userLocator), TIMEOUT);
    driver.wait(until.elementIsVisible(driver.findElement(userLocator)), TIMEOUT);
    driver.wait(until.elementIsEnabled(driver.findElement(userLocator)), TIMEOUT);
    driver.findElement(By.id('username')).sendKeys(PROPEL_ACC);

    var pwdLocator = By.id('password');
    driver.wait(until.elementLocated(pwdLocator), TIMEOUT);
    driver.wait(until.elementIsVisible(driver.findElement(pwdLocator)), TIMEOUT);
    driver.wait(until.elementIsEnabled(driver.findElement(pwdLocator)), TIMEOUT);
    driver.findElement(By.id('password')).sendKeys(PROPEL_PWD);

    var loginLocator = By.id('submit');
    driver.wait(until.elementLocated(loginLocator), TIMEOUT);
    driver.wait(until.elementIsVisible(driver.findElement(loginLocator)), TIMEOUT);
    driver.wait(until.elementIsEnabled(driver.findElement(loginLocator)), TIMEOUT);
    driver.findElement(By.id('submit')).click();

    //Wait for MainPage
    driver.wait(until.titleContains('HPE Helion Managed'), TIMEOUT);
}


function uploadJsonFile() {
    //goto import URL
    driver.get( importURL );

    //wait page loading
    driver.wait(until.elementLocated(By.xpath("//h3[text() = 'Import wizard']")), TIMEOUT).then( function() {
        log.debug("Import wizard is loaded...");
    });

    var locator = By.xpath("//input[@id = 'file-upload']");
    driver.wait(until.elementLocated( locator ), TIMEOUT);
    driver.wait(until.elementIsEnabled( driver.findElement(locator)), TIMEOUT);

    //driver.setFileDetector(new remote.FileDetector);
    driver.findElement( locator ).sendKeys( '/home/propelUploadJSON_.json' ).then( function() {
        log.debug("upload file ...");
    });
    //driver.switchTo().defaultContent();

    //go Next
    var nextLocator = By.xpath("//button[text() = 'Next' and @ng-click = 'next()']");
    driver.wait(until.elementLocated(nextLocator), TIMEOUT);
    driver.wait(until.elementIsVisible( driver.findElement( nextLocator )), TIMEOUT);
    driver.wait(until.elementIsEnabled( driver.findElement( nextLocator )), TIMEOUT);
    driver.findElement(nextLocator).click();

    //go Execute
    var executeLocator = By.xpath("//button[text() = 'Execute']");
    driver.wait(until.elementLocated(executeLocator), TIMEOUT);
    driver.wait(until.elementIsEnabled( driver.findElement( executeLocator )), TIMEOUT_ORGCHECK).then(function newCreate(){
        driver.wait(until.elementIsVisible( driver.findElement( executeLocator )), TIMEOUT);
        driver.findElement(executeLocator).click();

        var finishLocator = By.xpath("//button[contains(text(), 'Finish')]");
        driver.wait(until.elementLocated(finishLocator), TIMEOUT);
        driver.wait(until.elementIsEnabled( driver.findElement(finishLocator)), TIMEOUT);
        driver.wait(until.elementIsVisible( driver.findElement(finishLocator)), TIMEOUT);
        driver.findElement(finishLocator).click().then(
                log.info("Congratulations! New Propel URL is created...")
        );
    }, function existedURL(){
        log.info("Oops, Propel Org already existed...");
    });
}

function checkURLCreation(){
    //go Organization List
    var locator = By.xpath("//a[text() = 'Organization List']");
    driver.wait(until.elementLocated(locator), TIMEOUT);
    driver.wait(until.elementIsEnabled( driver.findElement(locator)), TIMEOUT);
    driver.wait(until.elementIsVisible( driver.findElement(locator)), TIMEOUT);
    driver.findElement(locator).click();

    //Search new created Org
    var searchLocator = By.id('search');
    driver.wait(until.elementLocated( searchLocator), TIMEOUT);
    driver.wait(until.elementIsEnabled( driver.findElement( searchLocator )), TIMEOUT);
    driver.wait(until.elementIsVisible( driver.findElement( searchLocator )), TIMEOUT);
    driver.findElement(searchLocator).sendKeys( displayName );

    //output result
    var orgLocator = By.xpath("//a[@title = '" + displayName + "' ]");
    driver.wait(until.elementLocated(orgLocator), TIMEOUT_ORGCHECK).then(function(){
        console.log("Log: Propel URL is created successfully! ");
    }, function(){
        throw new Error(" can't create Propel URL successfully. Check it manually...");
    });
}

//Will be removed after new UI release
function enableOrgIdentity() {
    var orgLocator = By.xpath("//a[@title = '" + displayName + "' ]");
    driver.wait(until.elementLocated(orgLocator), TIMEOUT);
    driver.wait(until.elementIsEnabled( driver.findElement( orgLocator)), TIMEOUT);
    driver.wait(until.elementIsVisible( driver.findElement( orgLocator)), TIMEOUT);
    driver.findElement(orgLocator).click();

    var editLocator = By.xpath("//h4[text() = 'Edit']");
    driver.wait(until.elementLocated(editLocator), TIMEOUT);
    driver.wait(until.elementIsEnabled( driver.findElement( editLocator)), TIMEOUT);
    driver.wait(until.elementIsVisible( driver.findElement( editLocator)), TIMEOUT);
    driver.findElement(editLocator).click();

    var enableLocator = By.id('enableSubscription');
    driver.wait(until.elementLocated(enableLocator), TIMEOUT);
    driver.wait(until.elementIsVisible(driver.findElement(enableLocator)), TIMEOUT);
    driver.wait(until.elementIsEnabled(driver.findElement(enableLocator)), TIMEOUT);
    driver.findElement(enableLocator).isSelected().then( function( bool ) {
        if( !bool){
            //enable subscription
            driver.findElement(enableLocator).click();
            //save
            var saveLocator = By.id('saveBtn');
            driver.wait(until.elementLocated(saveLocator), TIMEOUT);
            driver.wait(until.elementIsEnabled( driver.findElement(saveLocator)), TIMEOUT);
            driver.wait(until.elementIsVisible( driver.findElement(saveLocator)), TIMEOUT);
            driver.findElement(saveLocator).click();
        }
    });
}

function tearDown() {
    driver.quit();
    webPromise.cancel();
}

module.exports = {

    run : run
}