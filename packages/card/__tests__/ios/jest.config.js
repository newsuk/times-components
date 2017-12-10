const jestConfigurator = require("@times-components/jest-configurator");

module.exports = Object.assign(jestConfigurator("card", "ios"), {
  collectCoverageFrom: [
    "**/packages/card/*.js",
    "!**/packages/card/*stories*",
    "!**/packages/card/*.web.js",
    "!**/packages/card/__test__/**"
  ]
});
