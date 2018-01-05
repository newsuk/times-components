const jestConfigurator = require("@times-components/jest-configurator");

module.exports = Object.assign(jestConfigurator("link", "ios"), {
  collectCoverageFrom: [
    "**/packages/link/*.js",
    "!**/packages/link/*.web.js",
    "!**/packages/link/*.stories.js",
    "!**/packages/link/__tests__/**",
    "!**/packages/link/coverage/**"
  ]
});
