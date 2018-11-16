/* eslint-disable no-console */

import { ApolloServer } from "apollo-server";
import { makeMocks, article } from "@times-components/provider-test-tools";

import {
  authorArticlesWithImages as authorArticlesWithImagesQuery
} from "@times-components/provider-queries";
import authorProfile from "./fixtures/author-profile"
const serviceName = "Mock TPA server";

let server;

export function start() {

  console.log('Inside Mock TPA start');
  const schema = makeMocks(authorProfile());

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
