const path = require("path");
const webpack = require("webpack");

/* Our native storybook requires its
 * own config so that it knows to look
 * for development entry points first.
 */
module.exports = {
  resolve: {
    mainFields: ["devModule", "dev", "module", "main"],
  },
};
