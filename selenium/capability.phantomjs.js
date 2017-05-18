var phantomjs_path = require('phantomjs-prebuilt').path;
var customPhantom = require('selenium-webdriver/lib/capabilities.Capabilities').phantomjs();
customPhantom.set("phantomjs.binary.path", phantomjs_path);
customPhantom.set('phantomjs.cli.args', ['--web-security=no', '--ssl-protocol=any', '--ignore-ssl-errors=true']);
customPhantom.set('phantomjs.page.settings.userAgent', 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36');
customPhantom.set('phantomjs.page.settings.javascriptEnabled', true);
customPhantom.set('phantomjs.page.settings.loadImages', true);
customPhantom.set('phantom.cookiesEnabled', true);
customPhantom.set('phantom.javascriptEnabled', true);

module.exports = customPhantom;