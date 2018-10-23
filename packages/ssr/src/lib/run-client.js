/* eslint-env browser */
/* eslint-disable no-underscore-dangle */

const { ApolloClient } = require("apollo-client");
const { AppRegistry } = require("react-native");
const { createHttpLink } = require("apollo-link-http");
const fetch = require("node-fetch");
const { fragmentMatcher } = require("@times-components/schema");
const { InMemoryCache: Cache } = require("apollo-cache-inmemory");

const makeClient = () =>
  new ApolloClient({
    cache: new Cache({
      addTypename: true,
      fragmentMatcher
    }).restore(window.__APOLLO_STATE__),
    link: createHttpLink({
      fetch,
      uri: process.env.GRAPHQL_ENDPOINT
    })
  });

module.exports = (component, ...parameters) => {
  const client = makeClient();
  const App = component(client, ...parameters);

  AppRegistry.registerComponent("App", () => () => App);

  AppRegistry.runApplication("App", {
    rootTag: document.getElementById("app")
  });
};
