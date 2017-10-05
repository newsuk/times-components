/* globals beforeAll afterAll */
import fructose from "@times-components/fructose/setup";
import detox from "detox";
import config from "../package";

beforeAll(async() => {
    await fructose.hooks.mobile.setup();
    await detox.init(config.detox);
}, 180000);

afterAll(async() => {
  await detox.cleanup();
  await fructose.hooks.mobile.cleanup();
});