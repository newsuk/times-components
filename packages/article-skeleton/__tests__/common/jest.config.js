const jestConfigurator = require("@times-components-native/jest-configurator").default;

module.exports = jestConfigurator("common", __dirname, {
  coverageIgnoreGlobs: ["media-aspect-ratio.js"]
});
