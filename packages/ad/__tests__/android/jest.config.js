const jestConfigurator = require("@times-components/jest-configurator").default;

module.exports = jestConfigurator("android", __dirname, {
  coverageIgnoreGlobs: ["**/webview-event-callback-setup.js"]
});
