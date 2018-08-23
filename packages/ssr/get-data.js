const ReactDOMServer = require("react-dom/server");
const { AppRegistry } = require("react-native-web");
const { getDataFromTree } = require("react-apollo");
const { ServerStyleSheet } = require("styled-components");

module.exports = App =>
  getDataFromTree(App).then(() => {
    AppRegistry.registerComponent("App", () => () => App);

    const { element, getStyleElement } = AppRegistry.getApplication("App");
    const serverStylesheet = new ServerStyleSheet();

    const html = ReactDOMServer.renderToString(
      serverStylesheet.collectStyles(element)
    );

    const scStyles = serverStylesheet.getStyleTags();

    const rnwStyles = ReactDOMServer.renderToStaticMarkup(getStyleElement());

    return { html, rnwStyles, scStyles };
  });
