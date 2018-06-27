const jestConfigurator = require("@times-components/jest-configurator").default;

module.exports = jestConfigurator("android", __dirname, {
  coverageIgnoreGlobs: [
    "ad.js",
    "ad-composer.js",
    "ad-init.js",
    "utils/generate-config.js",
    "utils/prebid-config.js",
    "utils/webview-event-callback-setup.js"
  ]
});
