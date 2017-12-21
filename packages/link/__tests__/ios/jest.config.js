const jestConfigurator = require("@times-components/jest-configurator");

module.exports = Object.assign(jestConfigurator("link", "ios"), {
  collectCoverageFrom: [
    "**/packages/link/**/*.js",
    "!**/packages/link/**/link.web.js",
    "!**/packages/link/**/link.android.js",
    "!**/packages/link/**/*stories*",
    "!**/packages/link/__tests__/**",
    "!**/packages/link/coverage/**"
  ]
});
