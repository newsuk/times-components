const jestConfigurator = require("@times-components/jest-configurator").default;

// @TODO: remove "**/styles" and "slice.js" when related articles has been refactored and styles removed
module.exports = jestConfigurator("android", __dirname, [
  "responsive.web.js",
  "**/styles",
  "slice.js"
]);
