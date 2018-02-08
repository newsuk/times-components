const blacklist = require("metro-bundler/src/blacklist");

module.exports = {
  getBlacklistRE() {
    return blacklist([
      /\/node_modules\/jest-haste-map\/node_modules\/.*/,
      /\/node_modules\/react-native\/node_modules\/fb-watchman\/.*/,
      /\/node_modules\/@times-components\/fructose\/node_modules\/react-native\/.*/,
      /\/packages\/slice\/fructose\/node_modules\/.*/,
      /\/packages\/slice\/node_modules\/.*/,
      /\/packages\/storybook\/fructose\/node_modules\/.*/,
      /\/packages\/storybook\/node_modules\/.*/,
      /\/packages\/article-summary\/node_modules\/.*/
    ]);
  }
};
