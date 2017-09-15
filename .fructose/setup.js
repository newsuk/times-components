/* globals beforeAll afterAll */
import fructose from "@times-components/fructose/setup";
import detox from "detox";
import { spawn } from "child_process";
import config from "../package";

// this sets up the with component global, issue logged in fructose
fructose.withComponent();

beforeAll(async () => {
  if (process.env.IOS) {
    await fructose.hooks.mobile.setup();
    await detox.init(config.detox);
  } else {
    throw new Error("invalid platform - Could not run tests");
  }
}, 180000);

afterAll(async () => {
  if (process.env.IOS) {
    await detox.cleanup();
    await fructose.hooks.mobile.cleanup();
  }
});
