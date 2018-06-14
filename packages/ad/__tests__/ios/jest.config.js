const jestConfigurator = require("@times-components/jest-configurator").default;

module.exports = jestConfigurator("ios", __dirname, [
  "ad.js",
  "ad-composer.js",
  "ad-init.js",
  "ad-watermark.js",
  "generate-config.js",
  "placeholder.js",
  "prebid-config.js",
  "sizes.js",
  "webview-event-callback-setup.js"
]);
