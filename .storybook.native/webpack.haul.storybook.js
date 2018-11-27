const path = require("path");

module.exports = ({ platform }, { module, resolve, plugins }) => ({
  entry: path.resolve(__dirname, "./index.js"),
  plugins,
  mode: 'development',
  module: {
    ...module,
    rules: [
      ...module.rules,
      {
        test: /\.jsx?$/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: ["module:metro-react-native-babel-preset"],
        },
        exclude: /node_modules\/(?!react|@expo|svgs|pretty-format|haul|metro)/,
      },
      {
        include: /node_modules/,
        test: /\.mjs$/,
        type: "javascript/auto",
      },
    ]
  },
  resolve: {
    ...resolve,
    extensions: [`.${platform}.js`, ".native.js", ".js", ".webpack.js", ".mjs", ".js"],
    mainFields: ["devModule", "dev", "react-native", "browser", "module", "main"],
  },
});
