const jestConfigurator = require("@times-components/jest-configurator").default;

module.exports = jestConfigurator("ios", __dirname, [
  "responsive.web.js",
  "**/styles",
  "slice.js"
]);
