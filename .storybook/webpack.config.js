const path = require("path");
const webpack = require("webpack");
const crypto = require("crypto");

const crypto_orig_createHash = crypto.createHash;
crypto.createHash = algorithm => crypto_orig_createHash(algorithm == "md4" ? "sha256" : algorithm);

module.exports = async ({ config }, env, defaultConfig) => {
  config.devtool = "eval-source-map";
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias
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
