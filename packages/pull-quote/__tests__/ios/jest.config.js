const jestConfigurator = require("@times-components/jest-configurator");

module.exports = Object.assign(jestConfigurator("pull-quote", "ios"), {
  collectCoverageFrom: [
    "**/packages/pull-quote/*.js",
    "**/packages/pull-quote/styles/*.js",
    "!**/packages/pull-quote/**/*.android.js",
    "!**/packages/pull-quote/**/*.web.js",
    "!**/packages/pull-quote/*stories.js"
  ]
});
