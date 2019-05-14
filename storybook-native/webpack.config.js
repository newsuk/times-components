const path = require("path");

module.exports = (baseConfig, env, defaultConfig) => {
  baseConfig.entry = path.resolve(__dirname, "./index.js");
  baseConfig.resolve = {
    ...baseConfig.resolve,
    extensions: [".android.js", ".ios.js", ".native.js", ".js", ".webpack.js", ".mjs"],
    mainFields: ["devModule", "dev", "react-native", "browser", "module", "main"],
  };

  baseConfig.module.rules[0].test = /\.m?jsx?$/
  baseConfig.module.rules[0].query.presets = ["module:metro-react-native-babel-preset"]
  baseConfig.module.rules[0].query.plugins = []
  baseConfig.module.rules[0].exclude = /node_modules\/(?!react|@expo|svgs|pretty-format|metro)/;

  baseConfig.module.rules.push(
    {
      test: /\.(png|jpg|jpeg|gif)$/,
      loader: 'url-loader',
      options: { limit: 10000 }
    },
    {
      test: /\.(eot|woff|svg|ttf)$/,
      loader: 'file-loader'
    },
    {
      include: /node_modules/,
      test: /\.mjs$/,
      type: "javascript/auto",
    }
  );

  return baseConfig;
};
