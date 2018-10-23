/* eslint-disable no-console */

const { ApolloClient } = require("apollo-client");
const { AppRegistry } = require("react-native-web");
const { createHttpLink } = require("apollo-link-http");
const fetch = require("node-fetch");
const { fragmentMatcher } = require("@times-components/schema");
const { getDataFromTree } = require("react-apollo");
const { InMemoryCache: Cache } = require("apollo-cache-inmemory");
const ReactDOMServer = require("react-dom/server");
const { ServerStyleSheet } = require("styled-components");

const renderData = App =>
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

const makeClient = () =>
  new ApolloClient({
    cache: new Cache({
      addTypename: true,
      fragmentMatcher
    }),
    link: createHttpLink({
      fetch,
      headers: {
        authorization: process.env.AUTH_TOKEN
          ? `Bearer ${process.env.AUTH_TOKEN}`
          : ""
      },
      uri: process.env.GRAPHQL_ENDPOINT
    }),
    ssrMode: true
  });

module.exports = async (component, ...parameters) => {
  const client = makeClient();
  const App = component(client, ...parameters);

  const props = await renderData(App);
  const extract = client.extract();

  return { extract, props };
};
