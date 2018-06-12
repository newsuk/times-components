// @flow

import findNodeModules from "find-node-modules";
import path from "path";
import getCoveragePaths from "./coverage";
import mockRNComponent from "./react-native-mock-components";

export type Platform = "node" | "android" | "ios" | "web";

export const mockReactNativeComponent = mockRNComponent;

const nativeSpecific = (platform: Platform) => ({
  moduleNameMapper: {
    "\\.(png)$": "RelativeImageStub"
  },
  haste: {
    defaultPlatform: platform,
    platforms: [platform],
    providesModuleNodeModules: ["react", "react-native"],
    moduleFileExtensions: [`${platform}.js`, "native.js", "js", "json"]
  }
});

const webSpecific = {
  moduleNameMapper: {
    "react-native": "react-native-web",
    "\\.(png)$": "identity-obj-proxy"
  },
  testEnvironment: "jsdom",
  moduleFileExtensions: ["web.js", "js", "json"]
};

const nodeSpecific = {
  moduleNameMapper: {
    "react-native": "react-native-web",
    "\\.(png)$": "identity-obj-proxy"
  },
  testEnvironment: "node",
  moduleFileExtensions: ["node.js", "web.js", "js", "json"]
};

const platformIndependentSpecific = {
  moduleNameMapper: {
    "\\.(png)$": "identity-obj-proxy"
  },
  moduleFileExtensions: ["js", "json"]
};

const platformCode = platform => {
  switch (platform) {
    case "web":
      return webSpecific;
    case "node":
      return nodeSpecific;
    case "ios":
      return nativeSpecific("ios");
    case "android":
      return nativeSpecific("android");
    default:
      return platformIndependentSpecific;
  }
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

  const platformPath = platform ? `${platform}/` : "";

  return {
    preset: "react-native",
    ...platformCode(platform),
    rootDir,
    transform: {
      "^.+\\.js$": path.resolve(__dirname, "source-loader.js")
    },
    transformIgnorePatterns: [
      "node_modules/(?!(react-native|react-native-linear-gradient|react-native-iphone-x-helper|@times-components)/)"
    ],
    coverageDirectory: `${module}/coverage/${platformPath}`,
    collectCoverageFrom: getCoveragePaths(
      rootDir,
      path.join(module, "src"),
      platform,
      coverageIgnoreGlobs
    ),
    testMatch: [`${module}/__tests__/${platformPath}*.test.js`],
    testPathIgnorePatterns: [
      `${module}/__tests__/${platformPath}jest.config.js`
    ],
    snapshotSerializers: [
      "enzyme-to-json/serializer",
      "@times-components/jest-serializer"
    ],
    setupFiles: [
      path.resolve(__dirname, "../setup-jest.js"),
      "jest-plugin-context/setup"
    ]
  };
};
