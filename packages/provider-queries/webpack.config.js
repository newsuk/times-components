/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");

const toBeExported = {
  entry: {
    files: path.resolve(__dirname, "./src/article-extras.js")
  },
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        use: {
          loader: "graphql-tag/loader"
        }
      }
    ]
  }
};

const defaultConfiguration = require("@times-components/webpack-configurator")(
  __dirname,
  "dev"
);

module.exports = Object.assign(defaultConfiguration, toBeExported);
