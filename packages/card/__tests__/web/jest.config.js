const jestConfigurator = require("@times-components/jest-configurator");

module.exports = Object.assign(jestConfigurator("card", "web"), {
  collectCoverageFrom: [
    "**/packages/card/*.js",
    "!**/packages/card/card.js",
    "!**/packages/card/card-loading.js",
    "!**/packages/card/*stories*",
    "!**/packages/card/__test__/**"
  ]
});
