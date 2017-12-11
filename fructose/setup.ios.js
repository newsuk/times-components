/* globals beforeAll afterAll jasmine */
import fructose from "@times-components/fructose/setup";
import detox from "detox";
// eslint-disable-next-line import/no-unresolved
import config from "../package";

beforeAll(async () => {
  // increasing timeout to deal with long running detox commands
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  await fructose.hooks.mobile.setup();
  await detox.init(config.detox);
  // eslint-disable-next-line no-console
  console.log("loaded Detox");
}, 240000);

afterAll(async () => {
  await detox.cleanup();
  await fructose.hooks.mobile.cleanup();
});
