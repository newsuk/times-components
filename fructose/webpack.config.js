/* eslint-disable global-require */
const path = require("path");

module.exports = {
  entry: {
    app: path.join(__dirname, "./index.web.js")
  },
  resolve: {
    alias: {
      "react-native": "react-native-web",
      "@storybook/react-native": "@storybook/react"
    },
    extensions: [".web.js", ".js"],
    mainFields: ["module", "main"]
  },
  node: {
    fs: "empty",
    net: "empty"
  }
};
