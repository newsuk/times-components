/* eslint-env browser */

const { AppRegistry } = require("react-native");

module.exports = App => {
  AppRegistry.registerComponent("App", () => () => App);

  AppRegistry.runApplication("App", {
    rootTag: document.getElementById("app")
  });
};
