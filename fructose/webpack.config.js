/* eslint-disable global-require */
const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: {
    app: path.join(__dirname, "./index.web.js")
  },
  resolve: {
    alias: {
      "react-native": "react-native-web",
      "@storybook/react-native": "@storybook/react"
    },
    extensions: [".web.js", ".js", ".ios.js", ".android.js"],
    mainFields: ["module", "main"],
    plugins: [
      // Use the DLL in development.
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require("../dist/public/vendor-manifest.json") // eslint-disable-line import/no-unresolved
      })
    ]
  },
  node: {
    fs: "empty",
    net: "empty"
  }
};
