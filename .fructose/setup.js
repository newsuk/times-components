import detox from "detox";
import { FructoseServer } from "hjkadshhjkl-server";
import Client from "hjkadshhjkl-client";
import { spawnSync } from "child_process";
import { startPackager, kill } from "./startPackager";

// The paths in this need to be relative to <rootDir>/packages/component
const detoxConfig = {
  configurations: {
    "ios.sim.debug": {
      binaryPath:
        "../../ios/build/Build/Products/Debug-iphonesimulator/storybooknative.app",
      type: "ios.simulator",
      name: "iPhone 7"
    }
  }
};
var fructosePackager;
var server;
export var client;

export const setup = async () => {
  fructosePackager = await startPackager();
  server = new FructoseServer(7811);
  await server.start();
  client = Client(7811);
  await detox.init(detoxConfig);
};

export const teardown = async () => {
  await kill(fructosePackager);
  client.disconnect();
  server.close();
  await detox.cleanup();
};
