const jestConfigurator = require("@times-components/jest-configurator").default;

// @TODO: remove "**/styles" and "slice.web.js" when related articles has been refactored and styles removed
module.exports = jestConfigurator("web", __dirname, ["**/templates/**/index.js", "**/templates/styles.js", "**/styles", "slice.js", "slice.web.js"]);
