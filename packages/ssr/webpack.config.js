const path = require("path");
const crypto = require("crypto");
const outputFolder = require("./src/lib/resolve-dist");

const cryptoCreateHash = crypto.createHash;
crypto.createHash = algorithm =>
  cryptoCreateHash(algorithm === "md4" ? "sha256" : algorithm);

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
      plugins: ["babel-plugin-styled-components"],
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              esmodules: true
            }
          }
        ],
        "@babel/preset-react"
      ]
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
    extensions
  }
};
