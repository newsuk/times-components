const path = require("path");
const webpack = require("webpack");

const alias = { "react-native": "react-native-web" };
const extensions = [".web.js", ".js"];
const mode = "development";

const babelConfig = {
  test: /\.js$/,
  use: {
    loader: "babel-loader",
    options: {
      cacheDirectory: true,
      plugins: [
        "add-react-displayname",
        "react-native-web",
        "styled-components"
      ],
      presets: ["react-native"]
    }
  }
};

if (!process.env.GRAPHQL_ENDPOINT) {
  throw new Error("You need to set a GRAPHQL_ENDPOINT envar");
}

module.exports = {
  devtool: "inline-source-map",
  entry: {
    "author-profile": "./author-profile.client.js",
    topic: "./topic.client.js"
  },
  mode,
  module: {
    rules: [babelConfig]
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist")
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        GRAPHQL_ENDPOINT: JSON.stringify(process.env.GRAPHQL_ENDPOINT)
      }
    })
  ],
  resolve: {
    alias,
    extensions
  }
};
