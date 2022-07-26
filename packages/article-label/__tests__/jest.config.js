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
    "^.+\\.([jt]sx?|graphql)$": "babel-jest",
    "\\.(gql|graphql)$": "jest-transform-graphql",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@times-components|@storybook/react)/)"
  ]
}

module.exports = config;