const jestConfigurator = require("@times-components/jest-configurator").default;
const path = require("path");

module.exports = jestConfigurator("web", __dirname, {
  coverageIgnoreGlobs: [
    "tracking-context-types.js",
    "tracking.flow.js",
    "tracking.js"
  ],
  setupTestFrameworkScriptFile: path.join(__dirname, "./serializers")
});
