const jestConfigurator = require("@times-components/jest-configurator");

module.exports = Object.assign(jestConfigurator("article", "web"), {
  collectCoverageFrom: [
    "**/packages/article/*.js",
    "**/packages/article/styles/**/*.js",
    "!**/packages/article/article.js",
    "!**/packages/article/article-content.js",
    "!**/packages/article/*stories*",
    "!**/packages/article/__tests__/**",
    "!**/packages/article/*fructose*",
    "!**/packages/article/data-helper.js"
  ]
});
