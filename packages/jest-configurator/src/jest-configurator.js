// @flow

import findNodeModules from "find-node-modules";
import path from "path";
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
    providesModuleNodeModules: ["react", "react-native"]
  }
});

const webSpecific = {
  moduleNameMapper: {
    "^react-native$": "react-native-web",
    "\\.(png)$": "identity-obj-proxy"
  },
  testEnvironment: "jsdom",
  moduleFileExtensions: ["web.js", "js", "json"]
};

const nodeSpecific = {
  moduleNameMapper: {
    "^react-native$": "react-native-web",
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

type Options = {
  coverageIgnoreGlobs?: Array<string>,
  setupTestFrameworkScriptFile: string
};

export default (
  platform: Platform,
  cwd: string,
  { coverageIgnoreGlobs = [], setupTestFrameworkScriptFile }: Options = {}
) => {
  const [local, global] = findNodeModules(cwd);
  const module = path.resolve(cwd, local.replace("node_modules", ""));
  const rootDir = path.resolve(
    cwd,
    (global || local).replace("node_modules", "")
  );

  const platformPath = platform ? `${platform}/` : "";

  const config = {
    preset: "react-native",
    ...platformCode(platform),
    rootDir,
    transform: {
      "^.+\\.js$": path.resolve(__dirname, "source-loader.js")
    },
    transformIgnorePatterns: [
      "node_modules/(?!(react-native|react-native-linear-gradient|react-native-iphone-x-helper|@times-components)/)"
    ],
    coverageDirectory: path.join(module, "coverage", platformPath),
    collectCoverageFrom: [path.join(rootDir, module)],
    coveragePathIgnorePatterns: coverageIgnoreGlobs,
    testMatch: [`${module}/__tests__/${platformPath}*.test.js`],
    testPathIgnorePatterns: [
      path.join(module, "__tests__", platformPath, "jest.config.js")
    ],
    testURL: "http://localhost",
    setupFiles: [
      path.resolve(__dirname, "../setup-jest.js"),
      "jest-plugin-context/setup"
    ]
  };

  if (setupTestFrameworkScriptFile) {
    config.setupTestFrameworkScriptFile = setupTestFrameworkScriptFile;
  }

  return config;
};
