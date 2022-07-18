import findNodeModules from "find-node-modules";
import path from "path";

export default (cwd, options = {}) => {
  const { coverageIgnoreGlobs = [], setupFilesAfterEnv } = options;
  const [local, global] = findNodeModules(cwd);
  const module = path.resolve(cwd, local.replace("node_modules", ""));
  const rootDir = path.resolve(
    cwd,
    (global || local).replace("node_modules", "")
  );

  const platformPath = "web";

  const config = {
    moduleFileExtensions: ["ts", "tsx", "graphql", "js", "json"],
    moduleNameMapper: {
      "\\.(png)$": "identity-obj-proxy"
    },
    testEnvironment: "jsdom",
    collectCoverageFrom: [path.join(rootDir, module)],
    coverageDirectory: path.join(module, "coverage", platformPath),
    coveragePathIgnorePatterns: coverageIgnoreGlobs,
    modulePathIgnorePatterns: [
      "node_modules/redbox-react/node_modules/react/",
      "node_modules/@storybook/"
    ],
    preset: "react",
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
      "^.+\\.js$": path.resolve(__dirname, "source-loader.js"),
      // used to make jest understand graphql files once they're loaded
      "\\.(gql|graphql)$": "jest-transform-graphql",
      "^.+\\.graphql": "babel-jest"
    },
    transformIgnorePatterns: [
      "node_modules/(?!(@times-components|@storybook/react)/)"
    ]
  };

  return config;
};
