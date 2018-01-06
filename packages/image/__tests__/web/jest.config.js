const jestConfigurator = require("@times-components/jest-configurator");

module.exports = jestConfigurator("image", "web", [
  "add-missing-protocol.js",
  "style-native.js"
]);
