const jestConfigurator = require("@times-components-native/jest-configurator").default;

module.exports = jestConfigurator("web", __dirname, {
  coverageIgnoreGlobs: ["index.js", "slice-layout.js", "styles.js"]
});
