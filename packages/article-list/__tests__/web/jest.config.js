const jestConfigurator = require("@times-components/jest-configurator").default;

module.exports = jestConfigurator("web", __dirname, {
  coverageIgnoreGlobs: [
    "article-list-item-prop-types.js",
    "article-list-item-prop-types.web.js"
  ]
});
