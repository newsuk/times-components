const path = require("path");

const logProxy = val => console.log(val) || val;

module.exports = ({ platform }, { module, resolve }) => logProxy(module) && ({
  module: {
    ...module,
    rules: [
      ...module.rules,
      {
        test: /\.jsx?$/,
        loader: require.resolve('babel-loader'),
      },
    ]
  },
  entry: path.resolve(__dirname, "./index.js"),
  resolve: {
    ...resolve,
    extensions: [`.${platform}.js`, ".native.js", ".js"],
    mainFields: ["devModule", "dev", "react-native", "browser", "module", "main"],
  },
});
