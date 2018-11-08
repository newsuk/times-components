import { NativeModules } from "react-native";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { fragmentMatcher } from "@times-components/schema";

const { graphqlEndPoint } = NativeModules.ReactConfig;
const { fetch } = NativeModules.NativeFetch;

const link = fetch
  ? createHttpLink({
      fetch: (uri, opts) =>
        fetch(uri, opts).then(responseBody => new Response(responseBody)),
      uri: graphqlEndPoint
    })
  : createHttpLink({
      uri: graphqlEndPoint
    });

export default new ApolloClient({
  cache: new InMemoryCache({
    fragmentMatcher
  }),
  link
});
