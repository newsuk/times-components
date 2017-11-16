/**
 * Jest platform specific configuration
 */

/**
 * iOS and Android specific configuration
 * @param {string} platform - platform you are using ["android", "ios", "web"]
 */

const nativeSpecific = platform => ({
  haste: {
    defaultPlatform: platform,
    platforms: [platform],
    providesModuleNodeModules: ["react", "react-native"],
    moduleFileExtensions: [`${platform}.js`, "native.js", "js", "json"]
  }
});

/**
 * Web specific configuration
 */

const webSpecific = {
  moduleNameMapper: {
    "react-native": "react-native-web"
  },
  testEnvironment: "jsdom",
  moduleFileExtensions: ["web.js", "js", "json"]
};

/**
 * Exports a platform specific Jest config.
 * @constructor
 * @param {string} component - name of the foldername of the component
 * @param {string} platform - platform you are using ["android", "ios", "web"]
 */

const config = (component, platform) => ({
  preset: "react-native",
  ...(platform === "web" ? webSpecific : nativeSpecific(platform)),
  rootDir: "../../../../",
  transformIgnorePatterns: ["node_modules/(?!@times-components)/"],
  testMatch: [
    `<rootDir>/packages/${component}/__tests__/${platform}/*.test.js`
  ],
  testPathIgnorePatterns: [
    `<rootDir>/packages/${component}/__tests__/${platform}/jest.config.js`
  ],
  snapshotSerializers: ["enzyme-to-json/serializer"]
});

module.exports = config;
