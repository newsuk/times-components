const path = require("path");
const webpack = require("webpack");
const crypto = require("crypto");

const distPath = path.resolve(__dirname, "../dist/public");

const cryptoCreateHash = crypto.createHash;
crypto.createHash = algorithm =>
  cryptoCreateHash(algorithm === "md4" ? "sha256" : algorithm);

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
      path: path.join(distPath, "[name]-manifest.json"),
      name: "[name]",
      context: path.resolve(__dirname)
    })
  ]
};
