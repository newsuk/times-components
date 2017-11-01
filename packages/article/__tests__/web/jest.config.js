module.exports = {
  preset: "react-native",
  rootDir: "../../../../",
  transformIgnorePatterns: ["node_modules/(?!@times-components)/"],
  testMatch: ["<rootDir>/packages/article/__tests__/web/article.web.test.js"],
  moduleNameMapper: {
    "react-native": "react-native-web"
  },
  moduleFileExtensions: ["web.js", "js", "json"],
  testEnvironment: "jsdom"
}
