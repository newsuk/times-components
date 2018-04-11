const jestConfigurator = require("@times-components/jest-configurator").default;

module.exports = jestConfigurator(null, __dirname, [
  "decorators.js",
  "storybook.js"
]);
