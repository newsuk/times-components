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

let appium;
fructose.withComponent();

beforeAll(async () => {
  if (process.env.FRUCTOSE) {
    if (process.env.ANDROID || process.env.IOS) {
      await fructose.hooks.mobile.setup();
      if (process.env.ANDROID) {
        appium = await new Promise(resolve => {
          const proc = spawn("appium");
          proc.stdout.on("data", d => {
            if (d.toString("utf8").includes("started on 0.0.0.0:4723")) {
              resolve(proc);
            }
          });
        });
        const options = {
          desiredCapabilities: {
            platformName: "Android",
            platformVersion: "7.0",
            deviceName: "Android Emulator",
            app: path.join(
              __dirname,
              "../android/app/build/outputs/apk/app-debug.apk"
            )
          },
          host: "localhost",
          port: 4723
        };
        global.driver = webdriverio.remote(options);
        await global.driver.init();
        await global.driver.waitForVisible('//*[@text="Fructose"]', 45000);
      } else {
        await detox.init(config.detox);
      }
    } else if (process.env.WEB) {
      await fructose.hooks.web.setup();
      const taken = await checkIfPortTaken(10);
      if (!taken) {
        console.error("The fructose app did not start correctly");
        process.exit(1);
      }
      global.Chromeless = Chromeless;
    }
  }
}, 180000);

afterAll(async () => {
  if (process.env.IOS) {
    await detox.cleanup();
    await fructose.hooks.mobile.cleanup();
  }
  if (process.env.ANDROID) {
    appium.kill();
    await fructose.hooks.mobile.cleanup();
  }
  if (process.env.WEB) {
    await fructose.hooks.web.cleanup();
  }
});
