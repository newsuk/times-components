const jestConfigurator = require("@times-components/jest-configurator");

module.exports = Object.assign(jestConfigurator("link", "web"), {
  collectCoverageFrom: [
    "**/packages/link/*.web.js",
    "**/packages/link/text-link.js",
    "!**/packages/link/*.stories.js"
  ]
});
