module.exports = {
  preset: "react-native",
  rootDir: "../../../..",
  transformIgnorePatterns: ["node_modules/(?!@times-components)/"],
  testMatch: ["<rootDir>/packages/markup/__tests__/markup.web.test.js"],
  moduleNameMapper: {
    "react-native": "react-native-web",
    "@times-components/link": "<rootDir>/packages/link/link.web.js"
  },
  moduleFileExtensions: ["web.js", "js", "json"],
  testEnvironment: "jsdom"
};
