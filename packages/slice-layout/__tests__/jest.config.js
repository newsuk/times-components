const jestConfigurator = require("@times-components/jest-configurator").default;

module.exports = jestConfigurator(null, __dirname, {
  coverageIgnoreGlobs: [
    "templates",
    "slice-layout.js",
    "!templates/**/roles.js"
  ]
});
