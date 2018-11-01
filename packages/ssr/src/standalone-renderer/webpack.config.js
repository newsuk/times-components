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
          options: { cacheDirectory: true }
        }
      }
    ]
  },
  output: {
    filename: "[name].init.js",
    path: outputFolder
  }
});
