var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: "./packages/brightcove-video/brightcove-video.web.js",
  output: {
    path: path.join(__dirname, "packages/brightcove-video/"),
    filename: "brightcove-video.es5.web.js",
    libraryTarget: "commonjs"
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["es2015", "react"]
        }
      }
    ]
  },
  externals: [
    function(context, request, callback) {
      // Every module prefixed with "global-" becomes external
      // "global-abc" -> abc
      const regex = new RegExp("^((w+)/*)+$");
      if (regex.test(request)) {
        return callback(null);
      }

      callback();
    }
  ],
  resolve: {
    // Maps the 'react-native' import to 'react-native-web'.
    alias: {
      "react-native": "react-native-web",
      "@storybook/react-native": "@storybook/react"
    },
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: [".web.js", ".js", ".ios.js", ".android.js"]
  }
};
