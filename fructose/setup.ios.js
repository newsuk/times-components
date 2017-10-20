/* globals beforeAll afterAll */
import fructose from "@times-components/fructose/setup";
import detox from "detox";
import config from "../package";

beforeAll(async () => {
  // increasing timeout to deal with long running detox commands
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  await fructose.hooks.mobile.setup();
  await detox.init(config.detox);
  console.log("loaded Detox")
}, 240000);

afterAll(async () => {
  await detox.cleanup();
  await fructose.hooks.mobile.cleanup();
});
