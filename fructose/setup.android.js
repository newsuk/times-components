/* globals beforeAll afterAll jasmine */
import fructose from "@times-components/fructose/setup";
import path from "path";
import wd from "wd";

global.asserter = wd.asserters;
const driver = wd.promiseChainRemote({ host: "localhost", port: 4723 });

beforeAll(async () => {
  await fructose.hooks.mobile.setup();

  const options = {
    desiredCapabilities: {
      browserName: "",
      platformName: "Android",
      platformVersion: "5.1",
      deviceName: "Nexus_5X_API_22",
      app: path.join(
        __dirname,
        "../android/app/build/outputs/apk/release/app-release.apk"
      )
    },
    host: "localhost",
    port: 4723
  };
  global.driver = driver;
  await driver.init(options.desiredCapabilities).setImplicitWaitTimeout(3000);

  await global.driver.waitForElementsByXPath(
    '//*[@text="Fructose"]',
    global.asserter.isVisible,
    180000
  );

  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
}, 180000);

afterAll(async () => {
  await fructose.hooks.mobile.cleanup();
});
