/**
 * This is the shared configuration across all environments
 */

const nativeSpecific = platform => ({
  haste: {
    defaultPlatform: platform,
    platforms: [platform],
    providesModuleNodeModules: ["react", "react-native"]
  }
});

const webSpecific = {
  moduleNameMapper: {
    "react-native": "react-native-web"
  },
  testEnvironment: "jsdom"
};

const config = platform => ({
  preset: "react-native",
  ...(platform === "web" ? webSpecific() : nativeSpecific(platform)),
  rootDir: "../../../../",
  transformIgnorePatterns: ["node_modules/(?!@times-components)/"],
  testMatch: [
    `<rootDir>/packages/article/__tests__/${platform}/article.${platform}.test.js`
  ],
  moduleFileExtensions: [`${platform}.js`, "js", "json"]
});

module.exports = config;
