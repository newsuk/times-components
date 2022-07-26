const config = {
  moduleFileExtensions: ["ts", "tsx", "graphql", "js", "json"],
  testMatch: [`<rootDir>/**/*.test.js`],
  moduleNameMapper: {
    "\\.(png)$": "identity-obj-proxy"
  },
  testEnvironment: "jsdom",
  modulePathIgnorePatterns: [
    "node_modules/@storybook/"
  ],
  testURL: "http://localhost",
  // setupFiles: [
  //   path.resolve(__dirname, "../setup-jest.js"),
  //   "jest-plugin-context/setup"
  // ],
  transform: {
    // "^.+\\.js$": path.resolve(__dirname, "source-loader.js"),
    "\\.(gql|graphql)$": "jest-transform-graphql",
    "^.+\\.graphql": "babel-jest",
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@times-components|@storybook/react)/)"
  ]
}

module.exports = config;