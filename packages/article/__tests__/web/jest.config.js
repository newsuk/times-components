const jestConfigurator = require("@times-components/jest-configurator").default;
const path = require("path");

module.exports = jestConfigurator("web", __dirname, {
  coverageIgnoreGlobs: [
    "article-content.js",
    "article-lead-asset-image.js",
    "article-lead-asset-video.js",
    "data-helper.js"
  ],
  setupTestFrameworkScriptFile: path.join(__dirname, "./serializers")
});
