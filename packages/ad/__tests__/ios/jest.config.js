const jestConfigurator = require("@times-components/jest-configurator").default;
const path = require("path");

module.exports = jestConfigurator("ios", __dirname, {
  coverageIgnoreGlobs: [
    "ad.js",
    "ad-composer.js",
    "ad-init.js",
    "utils/generate-config.js",
    "utils/sizes.js",
    "placeholder.js",
    "prebid-config.js",
    "webview-event-callback-setup.js"
  ],
  setupTestFrameworkScriptFile: path.join(__dirname, "./serializers")
});
