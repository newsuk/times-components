import React from "react";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { fragmentMatcher } from "@times-components/utils";

const withClient = WrappedComponent => ({ graphqlEndPoint }) => fetch => {
  const link = createHttpLink({
    uri: graphqlEndPoint,
    fetch: (uri, opts) =>
      fetch(uri, opts).then(responseBody => new Response(responseBody))
  });

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache({
      fragmentMatcher
    })
  });

  return props => (
    <ApolloProvider client={client}>
      <WrappedComponent {...props} />
    </ApolloProvider>
  );
};

export default withClient;
