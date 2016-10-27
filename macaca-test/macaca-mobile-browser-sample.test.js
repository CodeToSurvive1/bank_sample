'use strict';

var _ = require('macaca-utils');

var browserName = process.env.browser || 'safari';
browserName = browserName.toLowerCase();

var iOSSafariOpts = {
  platformVersion: '10.0',
  deviceName: 'iPhone 5s',
  platformName: 'iOS',
  browserName: 'Safari'
};

var AndroidChromeOpts = {
  platformName: 'Android',
  browserName: 'Chrome'
};

var wd = require('webdriver-client')(_.merge({}, browserName === 'safari' ? iOSSafariOpts : AndroidChromeOpts));

describe('macaca mobile sample', function() {
  this.timeout(5 * 60 * 1000);

  var driver = wd.initPromiseChain();

  before(function() {
    return driver
      .initDriver();
  });

  after(function() {
    return driver
      .sleep(1000)
      .quit();
  });

  it('#0 should works with macaca', function() {
    return driver
      .get('http://www.baidu.com')
      .elementById('index-kw')
      .sendKeys('macaca')
      .elementById('index-bn')
      .tap()
      .sleep(5000)
      .source()
      .then(function(html) {
        html.should.containEql('macaca');
      })
      .takeScreenshot();
  });

  it('#1 should works with web', function() {
    return driver
      .get('http://www.baidu.com')
      .elementById('index-kw')
      .sendKeys('Macaca')
      .elementById('index-bn')
      .tap()
      .sleep(5000)
      .source()
      .then(function(html) {
        html.should.containEql('Macaca');
      })
      .takeScreenshot();
  });

});
