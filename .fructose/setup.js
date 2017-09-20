/* globals beforeAll afterAll */
import fructose from "@times-components/fructose/setup";
import detox from "detox";
import { Chromeless } from "chromeless";
import portscanner from "portscanner";
import EventEmitter from "events";
import config from "../package";

const isPortTaken = port =>
  new Promise(resolve => {
    portscanner.checkPortStatus(port, "127.0.0.1", (error, status) => {
      // Status is 'open' if currently in use or 'closed' if available
      const isTaken = status === "open";
      resolve(isTaken);
    });
  });

const checkIfPortTaken = x =>
  new Promise(resolve => {
    const event = new EventEmitter();
    event.on("taken", taken => {
      resolve(taken);
    });
    let taken;
    let repeatTimes = x;
    const interval = setInterval(async () => {
      repeatTimes -= 1;
      taken = await isPortTaken(3000);
      if (taken) {
        event.emit("taken", true);
        clearInterval(interval);
      }
      if (!taken && repeatTimes === 0) {
        event.emit("taken", false);
        clearInterval(interval);
      }
    }, 1000);
  });

  // this sets up the with component global, issue logged in fructose
  fructose.withComponent();

beforeAll(async () => {
  if (process.env.IOS) {
    await fructose.hooks.mobile.setup();
    await detox.init(config.detox);
  }

  if (process.env.WEB) {
    await fructose.hooks.web.setup();
    const taken = await checkIfPortTaken(10);
    if (!taken) {
      console.error("The fructose app did not start correctly");
      process.exit(1);
    }
    global.Chromeless = Chromeless;
  } else {
    throw new Error("invalid platform - Could not run tests");
  }
}, 180000);

afterAll(async () => {
  if (process.env.IOS) {
    await detox.cleanup();
    await fructose.hooks.mobile.cleanup();
  }
  if (process.env.WEB) {
    await fructose.hooks.web.cleanup();
  }
});
