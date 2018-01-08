const jestConfigurator = require("@times-components/jest-configurator").default;

module.exports = jestConfigurator("image", "web", [
  "add-missing-protocol.js",
  "style-native.js"
]);
