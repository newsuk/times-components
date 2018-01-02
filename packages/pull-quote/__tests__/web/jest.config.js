const jestConfigurator = require("@times-components/jest-configurator");

module.exports = Object.assign(jestConfigurator("pull-quote", "web"), {
  collectCoverageFrom: [
    "**/packages/pull-quote/*.js",
    "**/packages/pull-quote/styles/*.web.js",
    "!**/packages/pull-quote/*stories.js",
    "!**/packages/pull-quote/**/*.ios.js",
    "!**/packages/pull-quote/**/*.android.js"
  ]
});
