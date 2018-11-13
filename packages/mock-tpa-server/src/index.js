/* eslint-disable no-console */

import { ApolloServer } from "apollo-server";
import { article, makeMocks } from "@times-components/provider-test-tools";

const serviceName = "Mock TPA server";

let server;

export function start() {
  const [{ defaults }] = article();
  const schema = makeMocks(defaults);

  server = new ApolloServer({ schema });

  server.listen().then(({ url }) => {
    console.log(`🚀  ${serviceName} ready at ${url}`);
  });
}

export function stop() {
  if (server) {
    server.stop();
    console.log(`${serviceName} closed`);
  }
}
