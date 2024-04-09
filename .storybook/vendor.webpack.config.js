const path = require("path");
const webpack = require("webpack");
const crypto = require("crypto");

const crypto_orig_createHash = crypto.createHash;
crypto.createHash = algorithm => crypto_orig_createHash(algorithm == "md4" ? "sha256" : algorithm);

module.exports = {
  context: process.cwd(),
  entry: {
    vendor: ["prop-types", "react", "react-dom"]
  },
  mode: 'development',
  output: {
    filename: "[name].dll.js",
    path: path.resolve("./dist/public"),
    library: "[name]"
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join("./dist/public", "[name]-manifest.json"),
      name: "[name]",
      context: path.resolve(__dirname)
    })
  ]
};
