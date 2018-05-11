const path = require("path");

module.exports = ({ platform }, { module, resolve, plugins }) => ({
  entry: path.resolve(__dirname, "./index.js"),
  plugins,
  module: {
    ...module,
    rules: [
      ...module.rules,
      {
        test: /\.jsx?$/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: ["react-native"],
        },
        exclude: /node_modules\/(?!react|@expo|svgs|pretty-format|haul|metro)/,
      },
    ]
  },
  resolve: {
    ...resolve,
    extensions: [`.${platform}.js`, ".native.js", ".js"],
    mainFields: ["devModule", "dev", "react-native", "browser", "module", "main"],
  },
});
