const path = require("path");
const outputFolder = require("../lib/resolve-dist");

module.exports = () => ({
  entry: {
    article: path.resolve(__dirname, "./page-init/article.js"),
    "author-profile": path.resolve(__dirname, "./page-init/author-profile.js"),
    topic: path.resolve(__dirname, "./page-init/topic.js")
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            plugins: [
              "babel-plugin-styled-components",
              "@babel/plugin-proposal-object-rest-spread",
              "@babel/plugin-transform-react-display-name"
            ],
            presets: ["module:metro-react-native-babel-preset"]
          }
        }
      }
    ]
  },
  output: {
    filename: "[name].init.js",
    path: outputFolder
  }
});
