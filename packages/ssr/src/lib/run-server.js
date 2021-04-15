/* eslint-disable no-console */

const { ApolloClient } = require("apollo-client");
const { AppRegistry } = require("react-native-web");
const { ApolloLink } = require("apollo-link");
const { createHttpLink } = require("apollo-link-http");
const { createPersistedQueryLink } = require("apollo-link-persisted-queries");
const fetch = require("node-fetch");
const { fragmentMatcher } = require("@times-components/schema");
const { getDataFromTree } = require("react-apollo");
const { InMemoryCache } = require("apollo-cache-inmemory");
const ReactDOMServer = require("react-dom/server");
const { ServerStyleSheet } = require("styled-components");
const safeStringify = require("./safe-stringify");
const errorLink = require("./graphql-error-link");
const LoggingLink = require("./graphql-logging-link");

const makeClient = options => {
  if (!options.uri) {
    throw new Error("API endpoint is empty");
  }

  const networkInterfaceOptions = {
    fetch,
    headers: { "content-type": "application/json" },
    uri: options.uri
  };

  if (options.headers) {
    Object.assign(networkInterfaceOptions.headers, options.headers);
  }

  const httpLink = createHttpLink(networkInterfaceOptions);

  const link = ApolloLink.from(
    [
      new LoggingLink(options.uri, options.logger),
      errorLink(options.logger),
      options.usePersistedQueries &&
        createPersistedQueryLink({ useGETForHashedQueries: true }),
      httpLink
    ].filter(Boolean)
  );

  return new ApolloClient({
    cache: new InMemoryCache({ addTypename: true, fragmentMatcher }),
    link,
    ssrMode: true
  });
};

const renderData = (app, helmetContext = {}) =>
  getDataFromTree(app).then(() => {
    AppRegistry.registerComponent("App", () => () => app);

    const { element, getStyleElement } = AppRegistry.getApplication("App");
    const serverStylesheet = new ServerStyleSheet();

    const markup = ReactDOMServer.renderToString(
      serverStylesheet.collectStyles(element)
    );

    const responsiveStyles = serverStylesheet.getStyleTags();
    const styles = ReactDOMServer.renderToStaticMarkup(getStyleElement());

    const { helmet } = helmetContext;
    const headMarkup = helmet
      ? ["title", "meta", "link", "script"].reduce(
          (head, key) => head + helmet[key].toString(),
          ""
        )
      : "";

    return {
      headMarkup,
      markup,
      responsiveStyles,
      styles
    };
  });

module.exports = async (component, options) => {
  const helmetContext = {};
  const client = makeClient(options.client);
  const analyticsStream = () => {};
  const app = component(client, analyticsStream, options.data, helmetContext);

  const { headMarkup, markup, responsiveStyles, styles } = await renderData(
    app,
    helmetContext
  );

  const props = safeStringify(options.data);
  const initialProps = `<script>window.nuk['${
    options.name
  }'] = ${props};</script>`;

  const state = safeStringify(client.extract());
  const initialState = `<script>window.__APOLLO_STATE__ = ${state};</script>`;

  return {
    headMarkup,
    initialProps,
    initialState,
    markup,
    responsiveStyles,
    styles
  };
};
