const jestConfigurator = require("@times-components/jest-configurator");

module.exports = Object.assign(jestConfigurator("article", "ios"), {
  collectCoverageFrom: [
    "**/packages/article/*.js",
    "!**/packages/article/*.web.js",
    "!**/packages/article/*stories*",
    "!**/packages/article/__tests__/**",
    "!**/packages/article/*fructose*",
    "!**/packages/article/data-helper.js"
  ]
});
