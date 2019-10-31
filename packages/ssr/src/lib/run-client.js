/* eslint-env browser */
/* eslint-disable no-underscore-dangle */

const { ApolloClient } = require("apollo-client");
const { AppRegistry } = require("react-native");
const { createHttpLink } = require("apollo-link-http");
const fetch = require("unfetch").default;
const { fragmentMatcher } = require("@times-components/schema");
const { InMemoryCache } = require("apollo-cache-inmemory");
const {
  default: tealiumReporter,
  TealiumSendScheduler
} = require("@times-components/tealium");

const makeClient = options => {
  if (!options.uri) {
    throw new Error("API endpoint is empty");
  }

  const networkInterfaceOptions = {
    fetch,
    headers: options.headers ? { ...options.headers } : {},
    uri: options.uri
  };

  if (options.useGET) {
    networkInterfaceOptions.headers["content-type"] =
      "application/x-www-form-urlencoded";
    networkInterfaceOptions.useGETForQueries = true;
  }

  if (
    typeof window !== "undefined" &&
    window.nuk &&
    !options.skipAuthorization
  ) {
    const acsTnlCookie = window.nuk.getCookieValue("acs_tnl");
    const sacsTnlCookie = window.nuk.getCookieValue("sacs_tnl");
    networkInterfaceOptions.headers.Authorization = `Cookie acs_tnl=${acsTnlCookie};sacs_tnl=${sacsTnlCookie}`;
  }

  return new ApolloClient({
    cache: new InMemoryCache({ fragmentMatcher }).restore(
      options.initialState || {}
    ),
    link: createHttpLink(networkInterfaceOptions)
  });
};

const makeAnalyticsStream = options => {
  const tealiumSendScheduler = new TealiumSendScheduler(
    options.tracking,
    window,
    document
  );
  const reporter = tealiumReporter(tealiumSendScheduler);
  return reporter.analytics;
};

module.exports = (component, clientOptions, data) => {
  const client = makeClient({
    initialState: window.__APOLLO_STATE__,
    uri: window.nuk.graphqlapi.url,
    useGET: clientOptions.useGET,
    headers: clientOptions.headers,
    skipAuthorization: clientOptions.skipAuthorization
  });

  const reporterOptions = {
    tracking: window.nuk.tracking
  };
  const analyticsStream = makeAnalyticsStream(reporterOptions);

  const App = component(client, analyticsStream, data, {});

  AppRegistry.registerComponent("App", () => () => App);

  AppRegistry.runApplication("App", {
    rootTag: document.getElementById(clientOptions.rootTag)
  });
};
