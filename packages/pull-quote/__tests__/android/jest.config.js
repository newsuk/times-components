const jestConfigurator = require("@times-components/jest-configurator");

module.exports = Object.assign(jestConfigurator("pull-quote", "android"), {
  collectCoverageFrom: [
    "**/packages/pull-quote/*.js",
    "**/packages/pull-quote/styles/*.js",
    "!**/packages/pull-quote/styles/index.js",
    "!**/packages/pull-quote/**/*.ios.js",
    "!**/packages/pull-quote/**/*.web.js",
    "!**/packages/pull-quote/*stories.js"
  ]
});
