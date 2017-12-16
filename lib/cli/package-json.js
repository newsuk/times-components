module.exports = variables => ({
  name: `@times-components/${variables.packageName}`,
  version: variables.version || "0.0.1",
  description: variables.packageDescription,
  main: `${variables.packageName}`,
  scripts: {
    flow: "node_modules/flow-bin/cli.js",
    fmt: "prettier --write '**/*.*'",
    "prettier:diff": "prettier --list-different '**/*.*'",
    lint: "eslint . && npm run prettier:diff",
    test:
      "yarn test:android -- --ci --bail && yarn test:ios -- --ci --bail && yarn test:web -- --ci --bail --coverage",
    "test:android": "jest --config='./__tests__/android/jest.config.js'",
    "test:ios": "jest --config='./__tests__/ios/jest.config.js'",
    "test:web": "jest --config='./__tests__/web/jest.config.js'",
    "test:watch": "jest --projects */**/jest.config.js --watchAll"
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
    "@storybook/react-native": "3.2.11",
    "@times-components/jest-configurator": "0.0.8",
    "babel-cli": "6.24.1",
    "babel-core": "6.24.1",
    "babel-jest": "21.2.0",
    "babel-loader": "7.1.2",
    "babel-plugin-transform-react-remove-prop-types": "0.4.5",
    "babel-preset-flow": "6.23.0",
    "babel-preset-react-native": "1.9.2",
    eslint: "4.9.0",
    "flow-bin": "0.42.0",
    jest: "21.2.1",
    prettier: "1.8.2",
    react: "16.2.0",
    "react-dom": "16.2.0",
    "react-native": "0.50.1",
    "react-test-renderer": "16.2.0",
    webpack: "3.3.0"
  },
  dependencies: {
    "prop-types": "15.6.0"
  },
  peerDependencies: {
    react: ">=16",
    "react-dom": ">=16",
    "react-native": ">=0.50",
    "react-native-web": ">=0.1"
  },
  publishConfig: {
    access: "public"
  }
});
