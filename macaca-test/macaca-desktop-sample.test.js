'use strict';

var wd = require('webdriver-client')({
  platformName: 'desktop',
  browserName: 'electron'
});

describe('macaca desktop sample', function() {
  this.timeout(5 * 60 * 1000);

  const driver = wd.initPromiseChain();
  const initialURL = 'https://www.baidu.com';

  before(() => {
    return driver
      .initDriver()
      .maximize()
      .setWindowSize(1280, 800);
  });

  it('#0 打开浏览器', function() {
    return driver
      .get(initialURL)
      .sleep(3000);
  });

  it('#1 查询macaca', function() {
    return driver
      .elementById('kw')
      .sendKeys('macaca')
      .sleep(3000)
      .elementById('su')
      .click()
      .sleep(5000)
      .source()
      .then(function(html) {
        html.should.containEql('macaca');
      })
      .hasElementByCss('#head > div.head_wrapper')
      .then(function(hasHeadWrapper) {
        hasHeadWrapper.should.be.true();
      })
      .elementByXPathOrNull('//*[@id="kw"]')
      .sendKeys('elementByXPath')
      .sleep(3000)
      .elementById('su')
      .click()
      .sleep(5000)
      .saveScreenshot(
        '/Users/mac/software/github/macaca/bank_sample/pictures/pic1.png'
      );
  });

  it('#2 进入web页面', function() {
    return driver
      .get(initialURL)
      .sleep(3000);
  });

  it('#3 成功打开', function() {
    return driver
      .elementById('kw')
      .sendKeys('TesterHome')
      .sleep(3000)
      .elementById('su')
      .click()
      .sleep(5000)
      .source()
      .then(function(html) {
        html.should.containEql('TesterHome');
      })
      .saveScreenshot(
        '/Users/mac/software/github/macaca/bank_sample/pictures/pic2');
  });

  after((done) => {
    return driver
      .quit(done);
  });
});
