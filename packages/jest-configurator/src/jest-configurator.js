// @flow

import findNodeModules from "find-node-modules";

import path from "path";
import getCoveragePaths from "./coverage";

export type Platform = "android" | "ios" | "web";

const nativeSpecific = (platform: Platform) => ({
  haste: {
    defaultPlatform: platform,
    platforms: [platform],
    providesModuleNodeModules: ["react", "react-native"],
    moduleFileExtensions: [`${platform}.js`, "native.js", "js", "json"]
  }
});

const webSpecific = {
  moduleNameMapper: {
    "react-native": "react-native-web"
  },
  testEnvironment: "jsdom",
  moduleFileExtensions: ["web.js", "js", "json"]
};

export default (
  platform: Platform,
  cwd: string,
  coverageIgnoreGlobs: Array<string>
) => {
  const [local, global] = findNodeModules(cwd);
  const module = path.resolve(cwd, local.replace("node_modules", ""));
  const rootDir = path.resolve(
    cwd,
    (global || local).replace("node_modules", "")
  );

  return {
    preset: "react-native",
    ...(platform === "web" ? webSpecific : nativeSpecific(platform)),
    rootDir,
    transformIgnorePatterns: [
      "node_modules/(?!(react-native|react-native-linear-gradient|@times-components)/)"
    ],
    coverageDirectory: `${module}/coverage/${platform}/`,
    collectCoverageFrom: getCoveragePaths(
      rootDir,
      module,
      platform,
      coverageIgnoreGlobs
    ),
    testMatch: [`${module}/__tests__/${platform}/*.test.js`],
    testPathIgnorePatterns: [`${module}/__tests__/${platform}/jest.config.js`],
    snapshotSerializers: ["enzyme-to-json/serializer"],
    setupTestFrameworkScriptFile: path.resolve(__dirname, "../setup-jest.js")
  };
};
