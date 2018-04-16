const jestConfigurator = require("@times-components/jest-configurator").default;

module.exports = jestConfigurator("web", __dirname, [
  "add-missing-protocol.js",
  "style-native.js"
]);
