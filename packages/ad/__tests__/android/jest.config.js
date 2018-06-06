const jestConfigurator = require("@times-components/jest-configurator").default;
const path = require("path");

module.exports = jestConfigurator("android", __dirname, {
  coverageIgnoreGlobs: [
    "ad.js",
    "ad-composer.js",
    "ad-init.js",
    "ad-watermark.js",
    "generate-config.js",
    "placeholder.js",
    "prebid-config.js",
    "sizes.js",
    "webview-event-callback-setup.js"
  ],
  setupTestFrameworkScriptFile: path.join(__dirname, "./serializers")
});
