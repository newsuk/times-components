const jestConfigurator = require("@times-components/jest-configurator");

module.exports = Object.assign(jestConfigurator("author-head", "web"), {
  collectCoverageFrom: [
    "**/packages/author-head/*.js",
    "!**/packages/author-head/author-name.js",
    "!**/packages/author-head/author-bio.js",
    "!**/packages/author-head/author-title.js",
    "!**/packages/author-head/*.stories.js"
  ]
});
