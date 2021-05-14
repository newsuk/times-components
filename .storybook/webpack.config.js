const path = require("path");
const webpack = require("webpack");

module.exports = async ({ config }, env, defaultConfig) => {
  config.devtool = "eval-source-map";
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      "react-native": "react-native-web",
      "@storybook/react-native": "@storybook/react"
    },
    extensions: [".tsx", ".ts", ".web.js", ".js", ".mjs"],
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
      loader: "react-native-web-image-loader?name=[hash].[ext]"
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
