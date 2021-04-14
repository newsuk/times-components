import { NativeModules } from "react-native";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { createPersistedQueryLink } from "apollo-link-persisted-queries";
import { InMemoryCache } from "apollo-cache-inmemory";
import { fragmentMatcher } from "@times-components/schema";

const {
  NativeFetch,
  ReactConfig: { graphqlEndPoint }
} = NativeModules;

const httpLink = NativeFetch
  ? createHttpLink({
      fetch: (uri, opts) =>
        NativeFetch.fetch(uri, opts).then(
          responseBody => new Response(responseBody)
        ),
      uri: graphqlEndPoint
    })
  : createHttpLink({
      uri: graphqlEndPoint
    });

const link = ApolloLink.from([
  createPersistedQueryLink({ useGETForHashedQueries: true }),
  httpLink
]);

export default new ApolloClient({
  cache: new InMemoryCache({
    fragmentMatcher
  }),
  link
});
