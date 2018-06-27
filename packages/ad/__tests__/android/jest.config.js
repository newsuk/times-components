const jestConfigurator = require("@times-components/jest-configurator").default;
const path = require("path");

module.exports = jestConfigurator("android", __dirname, {
  coverageIgnoreGlobs: [
    "ad-composer.js",
    "ad-init.js",
    "utils/generate-config.js",
    "utils/prebid-config.js",
    "webview-event-callback-setup.js"
  ],
  setupTestFrameworkScriptFile: path.join(__dirname, "./serializers")
});
