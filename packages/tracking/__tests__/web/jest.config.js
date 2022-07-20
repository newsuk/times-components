const jestConfigurator = require("@times-components/jest-configurator-web").default;
const path = require("path");

module.exports = jestConfigurator(__dirname, {
  coverageIgnoreGlobs: ["tracking-context-types.js", "tracking.js"]
});
