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
    moduleFileExtensions: ["ts", "tsx", "graphql", "js", "json"],
    moduleNameMapper: {
      "\\.(png)$": "identity-obj-proxy"
    },
    testEnvironment: "jsdom",
    modulePathIgnorePatterns: ["node_modules/@storybook/"],
    rootDir,
    setupFiles: [path.resolve(__dirname, "../setup-jest.js")],
    setupFilesAfterEnv: setupFilesAfterEnv ? [setupFilesAfterEnv] : [],
    testMatch: [`${module}/__tests__/**/*.test.js`],
    testPathIgnorePatterns: [path.join(module, "__tests__", "jest.config.js")],
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
