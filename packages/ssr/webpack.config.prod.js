const webpackConfigCommon = require("./webpack.config.common");

module.exports = webpackConfigCommon({
  devtool: "source-map",
  mode: "production",
  optimization: {
    occurrenceOrder: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "initial",
          minChunks: 2,
          minSize: 0,
          name: "vendor"
        }
      }
    }
  }
});
