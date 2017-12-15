const jestConfigurator = require("@times-components/jest-configurator");

module.exports = Object.assign(jestConfigurator("card", "android"), {
  collectCoverageFrom: [
    "**/packages/card/*.js",
    "!**/packages/card/*stories*",
    "!**/packages/card/*.web.js",
    "!**/packages/card/__test__/**"
  ]
});
