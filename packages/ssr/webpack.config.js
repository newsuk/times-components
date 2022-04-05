const path = require("path");
const outputFolder = require("./src/lib/resolve-dist");

const alias = { "react-native$": "react-native-web" };
const extensions = [".js"];

const productionOptions = {
  devtool: "source-map",
  mode: "production"
};

const developmentOptions = {
  devtool: "inline-source-map",
  mode: "development"
};

const babelConfig = {
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
};

const options =
  process.env.NODE_ENV === "production"
    ? productionOptions
    : developmentOptions;

module.exports = {
  ...options,
  entry: {
    article: path.resolve(__dirname, "./src/client/article.js"),
    "author-profile": path.resolve(__dirname, "./src/client/author-profile.js"),
    topic: path.resolve(__dirname, "./src/client/topic.js")
  },
  module: {
    rules: [babelConfig]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "initial",
          minChunks: 2,
          minSize: 0,
          name: "common"
        }
      }
    }
  },
  output: {
    filename: "[name].react.bundle.js",
    path: outputFolder
  },
  resolve: {
    alias,
    extensions
  }
};
