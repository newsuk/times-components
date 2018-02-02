import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import TestLink from "./test-link";

export default function clientTester(requestHandler) {
  const link = new TestLink(requestHandler);
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link
  });

  return { client, link };
}
