const jestConfigurator = require("@times-components/jest-configurator").default;

module.exports = jestConfigurator("android", __dirname, [
  "responsive.web.js",
  "**/styles",
  "slice.js"
]);
