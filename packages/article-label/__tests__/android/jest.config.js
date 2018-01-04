const jestConfigurator = require("@times-components/jest-configurator");

module.exports = Object.assign(jestConfigurator("article-label", "android"), {
  collectCoverageFrom: [
    "**/packages/article-label/article-label.js",
    "**/packages/article-label/style/shared.js",
    "**/packages/article-label/**/*.android.js"
  ]
});
