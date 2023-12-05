/* eslint-env browser */
/* eslint-disable no-underscore-dangle */

const { ApolloClient } = require("apollo-client");
const ReactDOMClient = require("react-dom");
const { ApolloLink } = require("apollo-link");
const { createHttpLink } = require("apollo-link-http");
const { createPersistedQueryLink } = require("apollo-link-persisted-queries");
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
    fetch: (url, opts) => {
      const compressedUrl = url
        .replace(/(%20)+/g, "%20")
        .replace(/(%0A)+/g, "");

      return fetch(compressedUrl, opts);
    },
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

  const link = ApolloLink.from(
    [
      options.usePersistedQueries &&
        createPersistedQueryLink({ useGETForHashedQueries: true }),
      createHttpLink(networkInterfaceOptions)
    ].filter(Boolean)
  );

  return new ApolloClient({
    name: `@times-components/ssr/client (${options.clientName || "unknown"})`,
    cache: new InMemoryCache({ fragmentMatcher }).restore(
      options.initialState || {}
    ),
    link
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
    usePersistedQueries: window.nuk.graphqlapi.usePersistedQueries,
    skipAuthorization: clientOptions.skipAuthorization,
    clientName: window.nuk.graphqlapi.clientName
  });

  const reporterOptions = {
    tracking: window.nuk.tracking
  };
  const analyticsStream = makeAnalyticsStream(reporterOptions);

  const App = component(client, analyticsStream, data, {});

  if (clientOptions.zephrDivs && clientOptions.zephrDivs === true) {
    ReactDOMClient.hydrate(App, document.getElementById(clientOptions.rootTag));
  } else {
    ReactDOMClient.render(App, document.getElementById(clientOptions.rootTag));
  }
};
