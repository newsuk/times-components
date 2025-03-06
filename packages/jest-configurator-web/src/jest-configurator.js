import findNodeModules from "find-node-modules";
import path from "path";

export default (cwd, options = {}) => {
  const { setupFilesAfterEnv } = options;
  const [local, global] = findNodeModules(cwd);
  const module = path.resolve(cwd, local.replace("node_modules", ""));
  const rootDir = path.resolve(
    cwd,
    (global || local).replace("node_modules", "")
  );

  const config = {
    moduleFileExtensions: ["js", "json", "ts", "tsx", "graphql"],
    moduleNameMapper: {
      "\\.(png)$": "identity-obj-proxy"
    },
    modulePathIgnorePatterns: ["node_modules/@storybook/"],
    rootDir,
    setupFiles: [path.resolve(__dirname, "../setup-jest.js")],
    setupFilesAfterEnv: setupFilesAfterEnv ? [setupFilesAfterEnv] : [],
    testEnvironment: "jsdom",
    testMatch: [`${module}/__tests__/**/*.test.js`],
    testPathIgnorePatterns: [path.join(module, "__tests__", "jest.config.js")],
    testURL: "http://localhost",
    transform: {
      "^.+\\.js$": path.resolve(__dirname, "source-loader.js"),
      "\\.(gql|graphql)$": "jest-transform-graphql",
      "^.+\\.graphql": "babel-jest",
      "^.+\\.[jt]sx?$": "babel-jest",
      "^.+\\.[jt]s?$": "babel-jest"
    },
    transformIgnorePatterns: [
      "node_modules/(?!(@times-components|@storybook/react)/)"
    ]
  };

  return config;
};
