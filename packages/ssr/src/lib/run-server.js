/* eslint-disable no-console */

const { ApolloClient } = require("apollo-client");
const { AppRegistry } = require("react-native-web");
const { createHttpLink } = require("apollo-link-http");
const fetch = require("node-fetch");
const { fragmentMatcher } = require("@times-components/schema");
const { getDataFromTree } = require("react-apollo");
const { InMemoryCache: Cache } = require("apollo-cache-inmemory");
const ReactDOMServer = require("react-dom/server");
const safeStringify = require("./safe-stringify");
const { ServerStyleSheet } = require("styled-components");

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

const renderData = App =>
  getDataFromTree(App).then(() => {
    AppRegistry.registerComponent("App", () => () => App);

    const { element, getStyleElement } = AppRegistry.getApplication("App");
    const serverStylesheet = new ServerStyleSheet();

    const markup = ReactDOMServer.renderToString(
      serverStylesheet.collectStyles(element)
    );

    const extraStyles = serverStylesheet.getStyleTags();
    const styles = ReactDOMServer.renderToStaticMarkup(getStyleElement());

    return { extraStyles, markup, styles };
  });

module.exports = async (component, ...parameters) => {
  const client = makeClient();
  const App = component(client, ...parameters);

  const { extraStyles, markup, styles } = await renderData(App);

  const state = safeStringify(client.extract());
  const initialState = `<script>window.__APOLLO_STATE__ = ${state};</script>`;

  return { extraStyles, initialState, markup, styles };
};
