const jestConfigurator = require("@times-components/jest-configurator").default;

module.exports = jestConfigurator("ios", __dirname, {
  coverageIgnoreGlobs: [
    "tracking-context-types.js",
    "tracking.flow.js",
    "tracking.js"
  ]
});
