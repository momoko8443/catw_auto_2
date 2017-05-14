var webdriver = require('selenium-webdriver');
var phantomjs = require('selenium-webdriver/phantomjs');
var By = webdriver.By;
var until = webdriver.until;
var driver;

driver = new webdriver.Builder()
    .usingServer('http://localhost:4444/wd/hub')
    .forBrowser('phantomjs')
    .build();

driver.get('https://www.baidu.com');