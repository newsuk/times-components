// @flow

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
  component: string,
  platform: Platform,
  coverageIgnoreGlobs: Array<string>
) => ({
  preset: "react-native",
  ...(platform === "web" ? webSpecific : nativeSpecific(platform)),
  rootDir: "../../../../",
  transformIgnorePatterns: ["node_modules/(?!@times-components)/"],
  coverageDirectory: `<rootDir>/packages/${component}/coverage/${platform}/`,
  collectCoverageFrom: getCoveragePaths(
    `../${component}`,
    platform,
    coverageIgnoreGlobs
  ),
  testMatch: [
    `<rootDir>/packages/${component}/__tests__/${platform}/*.test.js`
  ],
  testPathIgnorePatterns: [
    `<rootDir>/packages/${component}/__tests__/${platform}/jest.config.js`
  ],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupTestFrameworkScriptFile:
    "<rootDir>/packages/jest-configurator/setup-jest.js"
});
