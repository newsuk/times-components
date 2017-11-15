/* globals beforeAll afterAll */
import fructose from "@times-components/fructose/setup";
import { Chromeless } from "chromeless";

beforeAll(async () => {
  const portToStartOn = 3000;
  const timeoutToCheckForWebStarted = 60000;
  await fructose.hooks.web.setup(portToStartOn, timeoutToCheckForWebStarted);

  global.Chromeless = Chromeless;
}, 180000);

afterAll(async () => {
  await fructose.hooks.web.cleanup();
});
