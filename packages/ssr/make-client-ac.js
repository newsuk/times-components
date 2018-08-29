/* eslint-env browser */
/* eslint-disable no-underscore-dangle */

const { InMemoryCache: Cache } = require("apollo-cache-inmemory");
const { ApolloClient } = require("apollo-client");
const { createHttpLink } = require("apollo-link-http");
const { fragmentMatcher } = require("@times-components/schema");
const fetch = require("node-fetch");

module.exports = () =>
  new ApolloClient({
    link: createHttpLink({
      fetch,
      uri: process.env.GRAPHQL_ENDPOINT
    }),
    cache: new Cache({ addTypename: true, fragmentMatcher }).restore(
      window.__APOLLO_STATE__
    )
  });
