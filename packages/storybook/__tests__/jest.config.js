const jestConfigurator = require("@times-components-native/jest-configurator").default;

module.exports = jestConfigurator(null, __dirname, [
  "decorators.js",
  "storybook.js"
]);
