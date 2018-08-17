const path = require("path");

module.exports = {
  collectCoverageFrom: ["**/jest-serializer/src/**"],
  coverageDirectory: `packages/jest-serializer/coverage/web`,
  moduleFileExtensions: ["web.js", "js", "json"],
  moduleNameMapper: {
    "react-native": "react-native-web",
    "\\.(png)$": "identity-obj-proxy"
  },
  preset: "react-native",
  rootDir: "../../",
  setupFiles: [path.resolve(__dirname, "./setup.js")],
  testEnvironment: "jsdom",
  testMatch: [`**/jest-serializer/__tests__/web/**.test.js`],
  testURL: "http://localhost",
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|react-native-linear-gradient|react-native-iphone-x-helper|@times-components)/)"
  ]
};
