const webpackConfigCommon = require("./webpack.config.common");

module.exports = webpackConfigCommon({
  devtool: "inline-source-map",
  mode: "development"
});
