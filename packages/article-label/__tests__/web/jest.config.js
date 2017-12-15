const jestConfigurator = require("@times-components/jest-configurator");

module.exports = Object.assign(jestConfigurator("article-label", "web"), {
  collectCoverageFrom: ["**/packages/article-label/article-label.js"]
});
