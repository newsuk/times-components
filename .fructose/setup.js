/* globals beforeAll afterAll */
import fructose from "@times-components/fructose/setup";
import detox from "detox";
import { Chromeless } from "chromeless";
import config from "../package";

beforeAll(async() => {
  if (process.env.IOS) {
    await fructose.hooks.mobile.setup();
    await detox.init(config.detox);
  } else if (process.env.WEB) {
    const portToStartOn = 3000;
    const timeoutToCheckForWebStarted = 60000;
    await fructose.hooks.web.setup(portToStartOn, timeoutToCheckForWebStarted);

    global.Chromeless = Chromeless;
  } else {
    throw new Error("Invalid platform - Could not run tests");
  }
}, 180000);

afterAll(async() => {
  if (process.env.IOS) {
    await detox.cleanup();
    await fructose.hooks.mobile.cleanup();
  }
  if (process.env.WEB) {
    await fructose.hooks.web.cleanup();
  }
});