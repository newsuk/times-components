/* eslint-disable */

const __DEV__ = process.env.NODE_ENV === "development";

const path = require("path");
const webpack = require("webpack");
const config = require("./shared.webpack.config.js");

const outputPath = path.join(__dirname, __DEV__ ? "vendor-dev" : "vendor");
const outputFilename = __DEV__ ? "[name].dll.js" : "[name]-[hash:16].dll.js";

const plugins = [
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    __DEV__
  }),

  ...(__DEV__ ? [] : config.productionPlugins),

  new webpack.DllPlugin({
    name: "[name]",
    path: path.join(outputPath, "[name]-manifest.json")
  })
];

module.exports = {
  entry: {
    react: ["react-native-web"]
  },
  output: {
    filename: outputFilename,
    path: outputPath,
    library: "[name]"
  },

  module: {
    noParse: /localforage\/dist\/localforage.js/,
    loaders: config.loaders
  },

  plugins,
  resolve: {
    alias: {
      "react-native": "react-native-web"
    },
    extensions: [".web.js", ".js", ".json"]
  }
};
