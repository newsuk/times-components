const path = require("path");
const webpack = require("webpack");
const crypto = require("crypto");

const cryptoCreateHash = crypto.createHash;
crypto.createHash = algorithm =>
  cryptoCreateHash(algorithm === "md4" ? "sha256" : algorithm);

module.exports = async ({ config }, env, defaultConfig) => {
  config.devtool = "eval-source-map";
  config.resolve = {
    ...config.resolve,
    fullySpecified: false, // Allow imports without the file extension
    alias: {
      ...config.resolve.alias
    },
    fallback: {
      "zlib": false,
      "stream": false,
      "https": false,
      "http": false
    },
    extensions: [".tsx", ".ts", ".js", ".mjs"],
    mainFields: ["devModule", "dev", "module", "main"]
  };
  config.plugins.push(
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.resolve("./dist/public/vendor-manifest.json")
    })
  );
  config.module.rules.push({
    test: /\.(tsx?)$/,
    loader: "babel-loader",
    options: {
      configFile: "./babel.config.js"
    }
  });
  config.module.rules.push(
    {
      test: /\.(png|jpe?g|gif)$/,
      loader: "file-loader",
      options: {
        name: '[path][name].[ext]',
      },
    },
    {
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto"
    },
    {
      test: /\.(graphql|gql)$/,
      use: {
        loader: "graphql-tag/loader"
      }
    }
  );

  return config;
};
