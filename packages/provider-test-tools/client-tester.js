import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import TestLink from "./test-link";

// @flow
type Operation = {
  queryName: string,
  variables: any
};

type RequestHandler = Operation => Promise<any>;

export default function clientTester(requestHandler: RequestHandler) {
  const link = new TestLink(requestHandler);
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link
  });

  return { client, link };
}
