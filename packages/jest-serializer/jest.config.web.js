module.exports = {
  preset: "react-native",
  moduleNameMapper: {
    "react-native": "react-native-web",
    "\\.(png)$": "identity-obj-proxy"
  },
  testEnvironment: "jsdom",
  moduleFileExtensions: ["web.js", "js", "json"],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|react-native-linear-gradient|react-native-iphone-x-helper|@times-components)/)"
  ],
  testMatch: [`**/jest-serializer/__tests__/web/**.test.js`],
  rootDir: "../../",
  coverageDirectory: `packages/jest-serializer/coverage/web`,
  collectCoverageFrom: ["**/jest-serializer/src/**"]
};
