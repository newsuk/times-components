import findNodeModules from "find-node-modules";
import path from "path";

const webSpecific = {
  moduleFileExtensions: ["ts", "tsx", "graphql", "js", "json"],
  testEnvironment: "jsdom"
};

const platformIndependentSpecific = {
  moduleFileExtensions: ["ts", "js", "json"]
};

const platformCode = platform => {
  switch (platform) {
    case "web":
      return webSpecific;
    default:
      return platformIndependentSpecific;
  }
};

export default ( cwd, options = {}) => {
  const { setupFilesAfterEnv, platform = "" } = options;
  const [local, global] = findNodeModules(cwd);
  const module = path.resolve(cwd, local.replace("node_modules", ""));
  const rootDir = path.resolve(
    cwd,
    (global || local).replace("node_modules", "")
  );

  const platformPath = platform ? `${platform}/` : "";
  const config = {
    moduleNameMapper: {
      "\\.(png)$": "identity-obj-proxy"
    },
    ...platformCode(platform),
    rootDir,
    setupFiles: [path.resolve(__dirname, "../setup-jest.js")],
    setupFilesAfterEnv: setupFilesAfterEnv ? [setupFilesAfterEnv] : [],
    testMatch: [`${module}/__tests__/${platformPath}*.test.js`],
    testPathIgnorePatterns: [
      path.join(module, "__tests__", platformPath, "jest.config.js")
    ],
    testURL: "http://localhost",
    transform: {
      "\\.(gql|graphql)$": "jest-transform-graphql",
      "^.+\\.graphql": "babel-jest",
      "^.+\\.[jt]sx?$": "babel-jest"
    },
    transformIgnorePatterns: [
      "node_modules/(?!(@times-components|@storybook/react)/)"
    ]
  };

  return config;
};
