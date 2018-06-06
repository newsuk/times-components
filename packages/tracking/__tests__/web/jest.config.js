const jestConfigurator = require("@times-components/jest-configurator").default;
const path = require("path");

module.exports = jestConfigurator("web", __dirname, {
  coverageIgnoreGlobs: ["storybook-components"],
  setupTestFrameworkScriptFile: path.join(__dirname, "./serializers")
});
