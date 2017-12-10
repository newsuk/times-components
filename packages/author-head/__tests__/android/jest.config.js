const jestConfigurator = require("@times-components/jest-configurator");

module.exports = Object.assign(jestConfigurator("author-head", "android"), {
  collectCoverageFrom: [
    "**/packages/author-head/*.js",
    "!**/packages/author-head/*.web.js",
    "!**/packages/author-head/*.stories.js"
  ]
});
