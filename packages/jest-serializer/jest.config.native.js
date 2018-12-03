module.exports = {
  collectCoverageFrom: [
    "**/jest-serializer/src/**",
    "!**/jest-serializer/src/rnw.js"
  ],
  coverageDirectory: `packages/jest-serializer/coverage/ios`,
  haste: {
    defaultPlatform: "ios",
    moduleFileExtensions: [`ios.js`, "native.js", "js", "json"],
    platforms: ["ios"],
    providesModuleNodeModules: ["react", "react-native"]
  },
  moduleNameMapper: {
    "\\.(png)$": "identity-obj-proxy"
  },
  modulePathIgnorePatterns: [
    "node_modules/haul/node_modules/react/",
    "node_modules/redbox-react/node_modules/react/"
  ],
  preset: "react-native",
  rootDir: "../../",
  testMatch: [`**/jest-serializer/__tests__/ios/**.test.js`],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|react-native-linear-gradient|react-native-iphone-x-helper|@times-components)/)"
  ]
};
