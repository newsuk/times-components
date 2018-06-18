module.exports = {
  preset: "react-native",
  moduleNameMapper: {
    "\\.(png)$": "identity-obj-proxy"
  },
  haste: {
    defaultPlatform: "ios",
    platforms: ["ios"],
    providesModuleNodeModules: ["react", "react-native"],
    moduleFileExtensions: [`ios.js`, "native.js", "js", "json"]
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|react-native-linear-gradient|react-native-iphone-x-helper|@times-components)/)"
  ],
  testMatch: [`**/jest-serializer/__tests__/ios/**.test.js`],
  rootDir: "../../",
  coverageDirectory: `packages/jest-serializer/coverage/ios`,
  collectCoverageFrom: [
    "**/jest-serializer/src/**",
    "!**/jest-serializer/src/rnw.js"
  ]
};
