'use strict';

var path = require('path');
var _ = require('macaca-utils');
var xml2map = require('xml2map');

var platform = process.env.platform || 'IOS';
platform = platform.toLowerCase();

var iOSOpts = {
  platformVersion: '9.3.4',
  deviceName: 'iPhone6 plus',
  platformName: 'iOS',
  //udid:'3db8cb4148adb72b74acfec99982850169d0b71f',
  udid: '9daef85429600e88ea5442ba3d5fee548c02aeac',
  // bundleId: 'xudafeng.ios-app-bootstrap.1'
  // bundleId: 'com.bankcomm.maidanba'
  // bundleId: 'com.csii.csbank'
  // bundleId: 'com.tencent.mm'
  //com.tencent.mipadqq
  bundleId: 'com.tencent.xin'
  // app: path.join(__dirname, '..', 'app', `${platform}-app-bootstrap.zip`)
};

var androidOpts = {
  platformName: 'Android',
  //package: 'com.github.android_app_bootstrap',
  //activity: 'com.github.android_app_bootstrap.activity.WelcomeActivity',
  app: path.join(__dirname, '..', 'app', `${platform}-app-bootstrap.zip`)
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

  it('#1 should login sucess', function() {

    return driver
        .sleep(2000)
        .elementByName('通讯录')
        .click()
        .sleep(3000)
        // touch@2x.png
        .elementByName('公众号')
        .click()
        .sleep(3000)
        .elementByName('安卓开发精选')
        .click()
        .sleep(5000)
        .elementByName('公号推荐')
        .click()
        .sleep(5000)
        .elementByName('安卓开发精选')
        .click()
        .sleep(3000);
  });


  // it('#1 should login sucess', function() {

  //   return driver
  //       .sleep(2000)
  //       .elementByName('生活')
  //       .click()
  //       .sleep(3000)
  //       // 联合商城
  //       .elementByName('BFE0654B7403953BF3AB42E78D53FA')
  //       // .elementByName('联合商城')
  //       .click()
  //       .sleep(3000)
  //       .elementByXPath('//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[3]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeOther[4]/XCUIElementTypeLink[1]')
  //       .click()
  //       .sleep(3000)
  //       .elementByName('积分乐园入口')
  //       .click()
  //       .sleep(3000)
  //       .elementByName('购物车')
  //       .click()
  //       .sleep(3000)

  //   ;

  // });


});
