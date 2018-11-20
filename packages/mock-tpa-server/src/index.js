/* eslint-disable no-console */

import { ApolloServer } from "apollo-server";
import { makeMocks } from "@times-components/provider-test-tools";
import mockData from "./fixtures/mock-data";

const serviceName = "Mock TPA server";

let server;

export function start() {
  const schema = makeMocks(mockData());

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
