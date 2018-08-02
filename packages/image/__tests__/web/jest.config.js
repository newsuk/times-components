const jestConfigurator = require("@times-components/jest-configurator").default;
const path = require("path");

module.exports = jestConfigurator("web", __dirname, {
  coverageIgnoreGlobs: ["index.js", "modal-image.web.js"],
  setupTestFrameworkScriptFile: path.join(__dirname, "./serializers")
});
