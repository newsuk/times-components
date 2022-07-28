const jestConfigurator = require("@times-components/jest-configurator-web")
  .default;

module.exports = jestConfigurator(__dirname, {
  coverageIgnoreGlobs: ["index.js", "slice-layout.js", "styles.js"]
});
