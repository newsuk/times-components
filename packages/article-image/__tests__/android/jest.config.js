const jestConfigurator = require("@times-components/jest-configurator");

module.exports = Object.assign(jestConfigurator("article-image", "android"), {
  collectCoverageFrom: [
    "**/packages/article-image/*.js",
    "!**/packages/article-image/*stories.js",
    "!**/packages/article-image/*.web.js"
  ]
});
