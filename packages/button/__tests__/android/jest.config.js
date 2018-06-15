const jestConfigurator = require("@times-components/jest-configurator").default;
const path = require("path");

module.exports = jestConfigurator("android", __dirname, {
  coverageIgnoreGlobs: ["shared.js"],
  setupTestFrameworkScriptFile: path.join(__dirname, "./serializers")
});
