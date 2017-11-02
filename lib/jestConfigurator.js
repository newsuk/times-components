/**
 * This is the shared configuration across all environments
 */

const nativeSpecific = platform => ({
  haste: {
    defaultPlatform: platform,
    platforms: [platform],
    providesModuleNodeModules: ["react", "react-native"],
    moduleFileExtensions: [`${platform}.js`, "native.js", "js", "json"]
  }
});

const webSpecific = {
  moduleNameMapper: {
    "react-native": "react-native-web"
  },
  testEnvironment: "jsdom",
  moduleFileExtensions: ["web.js", "js", "json"]
};

const config = platform => ({
  preset: "react-native",
  ...(platform === "web" ? webSpecific : nativeSpecific(platform)),
  rootDir: "../../../../",
  transformIgnorePatterns: ["node_modules/(?!@times-components)/"],
  testMatch: [
    `<rootDir>/packages/article/__tests__/${platform}/article.${platform}.test.js`
  ],
});

module.exports = config;
