module.exports = {
  preset: "react-native",
  rootDir: "../../../..",
  transformIgnorePatterns: ["node_modules/(?!@times-components)/"],
  testMatch: ["<rootDir>/packages/markup/__tests__/markup.native.test.js"]
};
