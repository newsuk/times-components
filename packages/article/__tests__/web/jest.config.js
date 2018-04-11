const jestConfigurator = require("@times-components/jest-configurator").default;

module.exports = jestConfigurator("web", __dirname, [
  "article-content.js",
  "article-lead-asset-image.js",
  "article-lead-asset-video.js",
  "data-helper.js"
]);
