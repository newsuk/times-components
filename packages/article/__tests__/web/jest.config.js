const jestConfigurator = require("@times-components/jest-configurator");

module.exports = Object.assign(jestConfigurator("article", "web"), {
  collectCoverageFrom: [
    "**/packages/article/**/*.js",
    "**/packages/article/**/*.web.js",
    "!**/packages/article/article-body-paragraph.js",
    "!**/packages/article/styles/**/index.js",
    "!**/packages/article/article.js",
    "!**/packages/article/article-content.js",
    "!**/packages/article/*stories*",
    "!**/packages/article/__tests__/**",
    "!**/packages/article/*fructose*",
    "!**/packages/article/data-helper.js",
    "!**/packages/article/**/*.android.js",
    "!**/packages/article/coverage/**",
    "!**/packages/article/__tests__/**"
  ]
});
