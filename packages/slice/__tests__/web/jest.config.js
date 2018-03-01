const jestConfigurator = require("@times-components/jest-configurator").default;

module.exports = jestConfigurator("web", __dirname, [
  "**/templates/**/index.js",
  "**/templates/styles.js",
  "**/styles",
  "slice.js",
  "slice.web.js"
]);
