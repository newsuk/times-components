/* eslint-disable no-console */

import { ApolloServer } from "apollo-server";
import { article, makeMocks } from "@times-components/provider-test-tools";

let server;

export function start() {
  const [{ defaults }] = article();
  const schema = makeMocks(defaults);

  server = new ApolloServer({
    schema
  });

  return server.listen().then(({ url }) => {
    console.log(`🚀 TPA Server ready at ${url}`);
  });
}

export function stop() {
  return server.stop();
}
