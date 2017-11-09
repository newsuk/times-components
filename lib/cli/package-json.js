module.exports = variables => ({
  name: `@times-components/${variables.packageName}`,
  version: variables.version || "0.0.1",
  description: variables.packageDescription,
  main: `${variables.packageName}`,
  scripts: {
    flow: "node_modules/flow-bin/cli.js",
    "prettier:diff": "prettier --list-different '**/*.+(js|json)'",
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
    "@times-components/jest-configurator": "0.0.1",
    "babel-cli": "6.24.1",
    "babel-core": "6.24.1",
    "babel-loader": "7.0.0",
    "babel-plugin-transform-react-remove-prop-types": "0.4.5",
    "babel-preset-flow": "6.23.0",
    "babel-preset-react-native": "1.9.2",
    eslint: "4.9.0",
    "eslint-config-airbnb": "16.1.0",
    "eslint-config-prettier": "2.6.0",
    "eslint-plugin-import": "2.8.0",
    "eslint-plugin-jsx-a11y": "6.0.2",
    "eslint-plugin-react": "7.4.0",
    "flow-bin": "0.42.0",
    jest: "21.2.1",
    prettier: "1.7.0",
    react: "16.0.0",
    "react-dom": "16.0.0",
    "react-native": "0.49.3",
    "react-test-renderer": "16.0.0",
    webpack: "3.3.0"
  },
  dependencies: {
    "prop-types": "15.6.0",
    "react-native-web": "0.1.7"
  },
  peerDependencies: {
    react: ">=16",
    "react-dom": ">=16",
    "react-native": ">=0.49"
  },
  publishConfig: {
    access: "public"
  }
});
