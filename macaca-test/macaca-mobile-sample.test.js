'use strict';

var path = require('path');
var _ = require('macaca-utils');
var xml2map = require('xml2map');

var platform = process.env.platform || 'iOS';
platform = platform.toLowerCase();

var iOSOpts = {
  platformVersion: '9.3',
  deviceName: 'iPhone 5s',
  platformName: 'iOS',
  //bundleId: 'xudafeng.ios-app-bootstrap',
  app: path.join(__dirname, '..', 'app', `${platform}-app-bootstrap.zip`)
};

var androidOpts = {
  platformName: 'Android',
  //package: 'com.github.android_app_bootstrap',
  //activity: 'com.github.android_app_bootstrap.activity.WelcomeActivity',
  app: path.join(__dirname, '..', 'app', `${platform}-app-bootstrap.zip`)
};

var wd = require('webdriver-client')(_.merge({}, platform === 'ios' ? iOSOpts : androidOpts));

// override back for ios
wd.addPromiseChainMethod('customback', function() {
  if (platform === 'ios') {
    return this;
  }

  return this
    .back();
});

describe('macaca mobile sample', function() {
  this.timeout(5 * 60 * 1000);

  var driver = wd.initPromiseChain();

  driver.configureHttp({
    timeout: 600000
  });

  before(function() {
    return driver
      .initDriver();
  });

  after(function() {
    return driver
      .sleep(1000)
      .quit();
  });

  it('#1 should login success', function() {
    return driver
      .getWindowSize()
      .then(size => {
        console.log(`current window size ${JSON.stringify(size)}`);
      })
      .login('中文+Test+12345678', '111111')
      .sleep(1000);
  });

  it('#2 should display home', function() {
    return driver
      .source()
      .then(res => {
        var xml = xml2map.tojson(res);
        console.log(xml);
      })
      .takeScreenshot();
  });

  it('#3 should scroll tableview', function() {
    return driver
      .elementByName('list')
      .getProperty('origin')
      .then(origin => {
        console.log(`list element origin:${JSON.stringify(origin)}`);
      })
      .elementByName('list')
      .getProperty('size')
      .then(size => {
        console.log(`list element size:${JSON.stringify(size)}`);
      })
      .elementByName('HOME')
      .click()
      .elementByName('list')
      .click()
      .sleep(1000);
  });

  it('#4 should display webview', function() {
    return driver
      .swipe(200, 400, 200, 100, 500)
      .customback()
      .sleep(1000)
      .elementByName('Webview')
      .click()
      .sleep(3000)
      .takeScreenshot();
  });

  it('#5 should go into webview', function() {
    return driver
      .webview()
      .elementById('pushView')
      .tap()
      .sleep(5000)
      .webview()
      .elementById('popView')
      .tap()
      .sleep(5000)
      .takeScreenshot();
  });

  it('#6 should go into test', function() {
    return driver
      .native()
      .elementByName('Baidu')
      .click()
      .sleep(5000)
      .takeScreenshot();
  });

  it('#7 should works with web', function() {
    return driver
      .webview()
      .elementById('index-kw')
      .sendKeys('中文+Macaca')
      .elementById('index-bn')
      .tap()
      .sleep(5000)
      .source()
      .then(function(html) {
        html.should.containEql('Macaca');
      })
      .takeScreenshot();
  });

  it('#8 should logout success', function() {
    return driver
      .native()
      .elementByName('PERSONAL')
      .click()
      .sleep(1000)
      .takeScreenshot()
      .elementByName('Logout')
      .click()
      .sleep(1000)
      .takeScreenshot();
  });
});
