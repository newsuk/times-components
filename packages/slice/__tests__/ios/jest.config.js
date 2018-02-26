const jestConfigurator = require("@times-components/jest-configurator").default;

// @TODO: remove "**/styles" when related articles has been refactored and styles removed
module.exports = jestConfigurator("ios", __dirname, [
  "responsive.web.js",
  "**/styles",
  "slice.js"
]);
