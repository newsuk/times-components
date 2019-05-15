import findNodeModules from "find-node-modules";
import path from "path";
import mockRNComponent from "./react-native-mock-components";

export const mockReactNativeComponent = mockRNComponent;

const nativeSpecific = platform => ({
  haste: {
    defaultPlatform: platform,
    platforms: [platform],
    hasteImplModulePath:
      "<rootDir>/node_modules/react-native/jest/hasteImpl.js",
    providesModuleNodeModules: ["react-native"]
  }
});

const webSpecific = {
  moduleFileExtensions: ["web.js", "js", "json"],
  moduleNameMapper: {
    "\\.(png)$": "identity-obj-proxy",
    "^react-native$": "react-native-web"
  },
  testEnvironment: "jsdom"
};

const nodeSpecific = {
  moduleFileExtensions: ["node.js", "web.js", "js", "json"],
  moduleNameMapper: {
    "\\.(png)$": "identity-obj-proxy",
    "^react-native$": "react-native-web"
  },
  testEnvironment: "node"
};

const platformIndependentSpecific = {
  moduleFileExtensions: ["js", "json"],
  moduleNameMapper: {
    "\\.(png)$": "identity-obj-proxy"
  }
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

export default (platform, cwd, options = {}) => {
  const { coverageIgnoreGlobs = [], setupFilesAfterEnv } = options;
  const [local, global] = findNodeModules(cwd);
  const module = path.resolve(cwd, local.replace("node_modules", ""));
  const rootDir = path.resolve(
    cwd,
    (global || local).replace("node_modules", "")
  );

  const platformPath = platform ? `${platform}/` : "";

  const config = {
    ...platformCode(platform),
    collectCoverageFrom: [path.join(rootDir, module)],
    coverageDirectory: path.join(module, "coverage", platformPath),
    coveragePathIgnorePatterns: coverageIgnoreGlobs,
    modulePathIgnorePatterns: [
      "node_modules/redbox-react/node_modules/react/",
      "node_modules/@storybook/"
    ],
    preset: "react-native",
    rootDir,
    setupFiles: [
      path.resolve(__dirname, "../setup-jest.js"),
      "jest-plugin-context/setup"
    ],
    setupFilesAfterEnv: setupFilesAfterEnv ? [setupFilesAfterEnv] : [],
    testMatch: [`${module}/__tests__/${platformPath}*.test.js`],
    testPathIgnorePatterns: [
      path.join(module, "__tests__", platformPath, "jest.config.js")
    ],
    testURL: "http://localhost",
    transform: {
      // @todo Remove this when upgrading to above react 0.56.0 (blocked by expo-sdk as of 2018/10/18)
      "^.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp)$":
        "<rootDir>/node_modules/react-native/jest/assetFileTransformer.js",
      "^.+\\.js$": path.resolve(__dirname, "source-loader.js")
    },
    transformIgnorePatterns: [
      "node_modules/(?!(react-native|react-native-svg|react-native-iphone-x-helper|@times-components|@storybook/react-native|react-native-swipe-gestures)/)"
    ]
  };

  return config;
};
