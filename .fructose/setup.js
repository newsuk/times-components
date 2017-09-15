/* globals beforeAll afterAll */
import fructose from "@times-components/fructose/setup";
import detox from "detox";
import webdriverio from "webdriverio";
import { spawn } from "child_process";
import { chromeless } from "chromeless";
import path from "path";
import portscanner from "portscanner";
import EventEmitter from "events";
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
