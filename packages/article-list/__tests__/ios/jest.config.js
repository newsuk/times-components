const jestConfigurator = require("@times-components-native/jest-configurator").default;

module.exports = jestConfigurator("ios", __dirname, {
  coverageIgnoreGlobs: ["article-list-prop-types.js", "**/**/utils/index.js"]
});
