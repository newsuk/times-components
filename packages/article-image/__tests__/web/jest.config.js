const jestConfigurator = require("@times-components/jest-configurator");

module.exports = Object.assign(jestConfigurator("article-image", "web"), {
  collectCoverageFrom: [
    "**/packages/article-image/*.js",
    "!**/packages/article-image/article.image.js",
    "!**/packages/article-image/*stories.js"
  ]
});
