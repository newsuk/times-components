import React from "react";
import { ApolloProvider } from "react-apollo";
import client from "./apollo-client";

const withNativeProvider = children => () => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default withNativeProvider;
