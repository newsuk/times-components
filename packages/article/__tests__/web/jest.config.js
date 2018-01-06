const jestConfigurator = require("@times-components/jest-configurator");

module.exports = jestConfigurator("article", "web", [
  "data-helper.js",
  "article-content.js"
]);
