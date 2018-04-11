const jestConfigurator = require("@times-components/jest-configurator").default;

module.exports = jestConfigurator("web", __dirname, [
  "tealium.js",
  "storybook.js"
]);
