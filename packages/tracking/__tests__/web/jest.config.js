const jestConfigurator = require("@times-components/jest-configurator").default;
const path = require("path");

module.exports = jestConfigurator("web", __dirname, {
  coverageIgnoreGlobs: ["tracking-context-types.js", "tracking.js"],
  setupFilesAfterEnv: path.join(__dirname, "./serializers")
});
