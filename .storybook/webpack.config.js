const path = require("path");
const webpack = require("webpack");

module.exports = {
  devtool: "eval-source-map",
  resolve: {
    // Maps the 'react-native' import to 'react-native-web'.
    alias: {
      "react-native": "react-native-web",
      "@storybook/react-native": "@storybook/react"
    },
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: [".web.js", ".js", ".ios.js", ".android.js"],
    mainFields: ["devModule", "dev", "module", "main"],
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'react-native-web-image-loader?name=[hash].[ext]',
      }
    ]
  },

  plugins: [
    // Use the DLL in development.
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.resolve("./dist/public/vendor-manifest.json")
    })
  ]
};
