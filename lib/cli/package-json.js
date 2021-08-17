module.exports = variables => ({
  name: `@times-components/${variables.packageName}`,
  version: variables.version || "0.0.1",
  description: variables.packageDescription,
  main: `dist/${variables.packageName}`,
  dev: `src/${variables.packageName}`,
  scripts: {
    depcheck:
      "depcheck --ignores='@babel/*,babel-*,depcheck,eslint,jest,prettier,webpack*' --ignore-bin-package=false --skip-missing",
    fmt: "eslint . --fix && prettier --write '**/*.*'",
    "prettier:diff": "prettier --list-different '**/*.*'",
    lint: "eslint . && yarn prettier:diff && yarn depcheck",
    "test:web": "jest --config='./__tests__/web/jest.config.js'",
    prepublishOnly: "yarn transpile && yarn bundle",
    watch: "watch 'yarn bundle' ./src --ignoreDotFiles --ignoreUnreadable",
    "cleanup-dist": "rm -rf dist",
    transpile: "yarn cleanup-dist && babel src -d dist",
    bundle: "NODE_ENV=production webpack -p"
  },
  repository: {
    type: "git",
    url: "git+https://github.com/newsuk/times-components.git"
  },
  keywords: [
    "react-native-web",
    "react",
    "native",
    "web",
    variables.packageName,
    "component"
  ],
  license: "BSD-3-Clause",
  bugs: {
    url: "https://github.com/newsuk/times-components/issues"
  },
  homepage: "https://github.com/newsuk/times-components#readme",
  devDependencies: {
    "@times-components/eslint-config-thetimes": "*",
    "@times-components/jest-configurator": "*",
    "@times-components/jest-serializer": "*",
    "@times-components/storybook": "*",
    "@times-components/test-utils": "*",
    "@times-components/webpack-configurator": "*",
    "@babel/core": "7.4.4",
    "babel-jest": "24.8.0",
    "babel-loader": "8.0.5",
    eslint: "4.19.1",
    jest: "23.3.0",
    prettier: "1.14.3",
    react: "16.6.3",
    "react-dom": "16.9.0",
    "react-native": "0.61.5",
    "react-test-renderer": "16.9.0",
    webpack: "4.30.0",
    "webpack-cli": "3.3.1"
  },
  resolutions: {
    react: "16.9.0",
    "react-dom": "16.9.0"
  },
  peerDependencies: {
    react: ">=16.9",
    "react-dom": ">=16.9",
    "react-native": ">=0.59",
    "react-native-web": "0.11.4"
  },
  publishConfig: {
    access: "public"
  }
});
