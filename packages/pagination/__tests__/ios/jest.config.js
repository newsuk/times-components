const jestConfigurator = require("@times-components/jest-configurator").default;

module.exports = jestConfigurator("ios", __dirname, {
  coverageIgnoreGlobs: ["pagination.js", "results-message.js"]
});
