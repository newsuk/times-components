// const { default: getDefaultConfig } = require('@storybook/react-native/dist/server/config/webpack.config');
const path = require("path");
const merge = require("lodash.merge");

module.exports = (options, ...platformConfigs) => merge(
  {},
  ...platformConfigs,
  {
    entry: path.resolve(__dirname, "./index.js"),
    resolve: {
      extensions: [".web.js", ".js", ".ios.js", ".android.js"],
      mainFields: ["devModule", "dev", "module", "main"],
    },
  },
);
