const jestConfigurator = require("@times-components/jest-configurator");

module.exports = Object.assign(jestConfigurator("pull-quotes", "web"), {
  collectCoverageFrom: [
    "**/packages/pull-quote/*.js",
    "!**/packages/pull-quote/*stories.js",
    "!**/packages/pull-quote/*.web.js"
  ]
});
