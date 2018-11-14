/* eslint-disable no-console */

const { ApolloClient } = require("apollo-client");
const { AppRegistry } = require("react-native-web");
const { createHttpLink } = require("apollo-link-http");
const fetch = require("node-fetch");
const { fragmentMatcher } = require("@times-components/schema");
const { getDataFromTree } = require("react-apollo");
const { InMemoryCache } = require("apollo-cache-inmemory");
const ReactDOMServer = require("react-dom/server");
const safeStringify = require("./safe-stringify");
const { ServerStyleSheet } = require("styled-components");
const { ApolloLink } = require("apollo-link");
const errorLink = require("./graphql-error-link");
const LoggingLink = require("./graphql-logging-link");

const makeClient = options => {
  if (!options.uri) {
    throw new Error("API endpoint is empty");
  }

  const networkInterfaceOptions = {
    fetch,
    headers: { "content-type": "application/x-www-form-urlencoded" },
    uri: options.uri,
    useGETForQueries: true
  };

  if (options.headers) {
    Object.assign(networkInterfaceOptions.headers, options.headers);
  }

  const httpLink = createHttpLink(networkInterfaceOptions);

  const link = ApolloLink.from([
    new LoggingLink(options.uri, options.logger),
    errorLink(options.logger),
    httpLink
  ]);

  return new ApolloClient({
    cache: new InMemoryCache({ addTypename: true, fragmentMatcher }),
    link,
    ssrMode: true
  });
};

const renderData = App =>
  getDataFromTree(App).then(() => {
    AppRegistry.registerComponent("App", () => () => App);

    const { element, getStyleElement } = AppRegistry.getApplication("App");
    const serverStylesheet = new ServerStyleSheet();

    const markup = ReactDOMServer.renderToString(
      serverStylesheet.collectStyles(element)
    );

    const responsiveStyles = serverStylesheet.getStyleTags();
    const styles = ReactDOMServer.renderToStaticMarkup(getStyleElement());

    return { markup, responsiveStyles, styles };
  });

module.exports = async (component, options) => {
  const client = makeClient(options.client);
  const analyticsStream = () => {};
  const App = component(client, analyticsStream, options.data);

  const { markup, responsiveStyles, styles } = await renderData(App);

  const props = safeStringify(options.data);
  const initialProps = `<script>window.nuk['${
    options.name
  }'] = ${props};</script>`;

  const state = safeStringify(client.extract());
  const initialState = `<script>window.__APOLLO_STATE__ = ${state};</script>`;

  return {
    initialProps,
    initialState,
    markup,
    responsiveStyles,
    styles
  };
};
