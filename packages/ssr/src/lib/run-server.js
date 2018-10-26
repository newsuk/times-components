/* eslint-disable no-console */

const { ApolloClient } = require("apollo-client");
const { AppRegistry } = require("react-native-web");
const { createHttpLink } = require("apollo-link-http");
const fetch = require("unfetch").default;
const { fragmentMatcher } = require("@times-components/schema");
const { getDataFromTree } = require("react-apollo");
const { InMemoryCache } = require("apollo-cache-inmemory");
const ReactDOMServer = require("react-dom/server");
const safeStringify = require("./safe-stringify");
const { ServerStyleSheet } = require("styled-components");

const makeClient = options => {
  if (!options.uri) {
    throw new Error("API endpoint is empty");
  }

  const networkInterfaceOptions = {
    fetch,
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    uri: options.uri,
    useGETForQueries: true
  };

  if (options.headers) {
    Object.assign(networkInterfaceOptions.headers, options.headers);
  }

  return new ApolloClient({
    cache: new InMemoryCache({ addTypename: true, fragmentMatcher }),
    link: createHttpLink(networkInterfaceOptions),
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

    const extraStyles = serverStylesheet.getStyleTags();
    const styles = ReactDOMServer.renderToStaticMarkup(getStyleElement());

    return { extraStyles, markup, styles };
  });

module.exports = async (component, options) => {
  const client = makeClient({ uri: options.uri });
  const analyticsStream = () => {};
  const App = component(client, analyticsStream, options);

  const { extraStyles, markup, styles } = await renderData(App);

  const state = safeStringify(client.extract());
  const initialState = `<script>window.__APOLLO_STATE__ = ${state};</script>`;

  return { extraStyles, initialState, markup, styles };
};
