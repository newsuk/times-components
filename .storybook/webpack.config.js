const path = require("path");
const webpack = require("webpack");

module.exports = async ({ config: baseConfig }) => {
  baseConfig.devtool = "eval-source-map"
  baseConfig.resolve = {
    ...baseConfig.resolve,
    alias: {
      ...baseConfig.resolve.alias,
      "react-native": "react-native-web",
      "@storybook/react-native": "@storybook/react"
    },
    extensions: [".web.js", ".js", ".ios.js", ".android.js", ".mjs"],
    mainFields: ["devModule", "dev", "module", "main"]
  };
  baseConfig.plugins.push(
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.resolve("./dist/public/vendor-manifest.json")
    })
  );
  baseConfig.module.rules.push(
    {
      test: /\.(png|jpe?g|gif)$/,
      loader: 'react-native-web-image-loader?name=[hash].[ext]',
    },
    {
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto'
    },
    {
      test: /\.stories\.js?$/,
      loaders: [require.resolve('@storybook/addon-storysource/loader')],
      enforce: 'pre',
    }
  );

  return baseConfig;
};
