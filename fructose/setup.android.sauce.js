/* globals beforeAll afterAll jasmine */
import fructose from "@times-components/fructose/setup";
import wd from "wd";

const { SAUCE_USERNAME, SAUCE_KEY } = process.env;

if (!SAUCE_KEY || !SAUCE_USERNAME) {
  throw new Error(
    `
  Sauce username or key is undefined. 
  Please set the Environment Variables SAUCE_KEY and SAUCE_USERNAME
  `
  );
}

global.asserter = wd.asserters;
const driver = wd.promiseChainRemote(
  `https://${SAUCE_USERNAME}:${SAUCE_KEY}@ondemand.saucelabs.com:443/wd/hub`
);

beforeAll(async () => {
  await fructose.hooks.mobile.setup();

  const options = {
    desiredCapabilities: {
      appiumVersion: "1.6.5",
      platformName: "Android",
      browserName: "",
      deviceName: "Android GoogleAPI Emulator",
      platformVersion: "7.1",
      app: "sauce-storage:fructose-e2e.apk",
      autoGrantPermissions: true
    },
    host: "localhost",
    port: 4723
  };

  global.driver = driver;
  await driver.init(options.desiredCapabilities).setImplicitWaitTimeout(300000);

  await global.driver.waitForElementsByXPath(
    '//*[@text="Fructose"]',
    global.asserter.isDisplayed,
    1800000
  );

  jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
}, 1800000);

afterAll(async () => {
  await fructose.hooks.mobile.cleanup();
});
