const jestConfigurator = require("@times-components/jest-configurator");

module.exports = Object.assign(jestConfigurator("link", "web"), {
  collectCoverageFrom: [
    "**/packages/link/**/*.js",
    "!**/packages/link/**/link.js",
    "!**/packages/link/**/link.android.js",
    "!**/packages/link/**/*stories*",
    "!**/packages/link/__tests__/**",
    "!**/packages/link/coverage/**"
  ]
});
