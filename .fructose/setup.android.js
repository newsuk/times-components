/* globals beforeAll afterAll */
import fructose from "@times-components/fructose/setup";
import path from 'path';
//const webdriverio = require('webdriverio');
import wd from "wd";
global.asserter = wd.asserters;
const d = wd.promiseChainRemote({host: 'localhost', port: 4723})

beforeAll(async() => {
    // increasing timeout to deal with long running detox commands
    await fructose.hooks.mobile.setup();
    
    const options = {
      desiredCapabilities: {
        browserName: '',
        platformName: "Android",
        platformVersion: "7.1.1",
        deviceName: "Android Emulator",
        app: path.join(
          __dirname,
          "../android/app/build/outputs/apk/debug/app-debug.apk"
        )
      },
      host: "localhost",
      port: 4723
    };
    // global.driver = webdriverio.remote(options);
    global.d = d;
    await d.init(options.desiredCapabilities).setImplicitWaitTimeout(3000);    
    //await global.driver.init();

    // global.driver.on('error', function(e) {
    //   // will be executed everytime an error occurred
    //   // e.g. when element couldn't be found
    //   console.error(e.body.value.class);   // -> "org.openqa.selenium.NoSuchElementException"
    //   console.error(e.body.value.message); // -> "no such element ..."
    // })
  

    await global.d.waitForElementsByXPath('//*[@text="Fructose"]', global.asserter.isVisible ,180000);

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
}, 180000);

afterAll(async() => {
  await fructose.hooks.mobile.cleanup();
});