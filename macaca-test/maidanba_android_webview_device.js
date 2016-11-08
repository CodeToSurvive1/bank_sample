'use strict';

var path = require('path');
var _ = require('macaca-utils');
var xml2map = require('xml2map');

var platform = process.env.platform || 'android';
platform = platform.toLowerCase();

var iOSOpts = {
  platformVersion: '9.3.4',
  deviceName: 'iPhone6 plus',
  platformName: 'iOS',
  udid: '9daef85429600e88ea5442ba3d5fee548c02aeac',
  // bundleId: 'xudafeng.ios-app-bootstrap.1'
  bundleId: 'com.bankcomm.maidanba'
    // bundleId: 'com.csii.csbank'
    // bundleId: 'com.tencent.mm'
    // bundleId: 'com.tencent.xin'



  // app: path.join(__dirname, '..', 'app', `${platform}-app-bootstrap.zip`)
};

var androidOpts = {
  platformName: 'Android',
  package: 'com.bankcomm.maidanba',
  reuse: 2,
  udid: '2353c4bb',
//   udid: 'PBV0216706008526',
  
  activity: '.activity.SplashActivity',
  // activity: 'com.bankcomm.maidanba/.activity.SplashActivity',
  // app: path.join(__dirname, '..', 'app', `${platform}-app-bootstrap.zip`)
};

var wd = require('webdriver-client')(_.merge({}, platform === 'ios' ? iOSOpts :
  androidOpts));

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
      .sleep(5000)
      .quit();
  });


  // it('#1 联合商城', function() {

  //   return driver
  //     .sleep(2000)
  //     .waitForElementByName('生活')
  //     .click()
  //     .sleep(3000)
  //     .elementByName('联合商城')
  //     .click()
  //     .sleep(3000)
  //     .webview()
  //     .elementByXPath(
  //       '//*[@id="layout"]/div[2]/div/table/tbody/tr[1]/td[2]/a/img')
  //     .click()
  //     .sleep(3000)
  //     .elementByXPath('//*[@id="layout"]/div[2]/a')
  //     .click()
  //     .sleep(3000)
  //     ;

  // });


  it('#1 点击生活按钮', function() {
    return driver
      .sleep(10000)
      .waitForElementByName('生活')
      .click()
      .sleep(10000);
  });


  it('#2 点击商旅出行', function() {
    return driver
      .elementByName('商旅出行')
      .click()
      .sleep(10000);
  });


  it('#3 点击换旅程', function() {
    return driver
      .webview()
      .elementByXPath(
        '//*[@id="layout"]/div[2]/div[3]/ul/li[1]/a')
      .click()
      .sleep(10000);
  });



  // it('#1 should login 商旅出行', function() {
  //
  //   return driver
  //     .sleep(2000)
  //     .waitForElementByName('生活')
  //     .click()
  //     .sleep(3000)
  //     .elementByName('商旅出行')
  //     .click()
  //     .sleep(3000)
  //     .webview()
  //     .elementByXPath(
  //       '//*[@id="layout"]/div[2]/div[3]/ul/li[1]/a')
  //     .click()
  //     .sleep(3000);
  // });
});
