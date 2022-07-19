const jestConfigurator = require("@times-components/jest-configurator-web").default;

module.exports = jestConfigurator(null, __dirname, [
  "decorators.js",
  "storybook.js"
]);
