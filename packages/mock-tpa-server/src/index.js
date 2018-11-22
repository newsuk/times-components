/* eslint-disable no-console */

import { ApolloServer } from "apollo-server";
import { printSchema, buildClientSchema } from "graphql/utilities";
import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";
import tpaSchema from "../../schema/schema.json";
import createMockFunctions from "./create-mock-functions";

const serviceName = "Mock TPA server";

let server;

export function startWithMockData(mockData) {
  return new Promise(resolve => {
    const { __schema } = tpaSchema.data;
    const schemaSDL = printSchema(buildClientSchema({ __schema }));

    const executableSchema = makeExecutableSchema({
      resolverValidationOptions: {
        requireResolversForResolveType: false
      },
      typeDefs: schemaSDL
    });

    const mocks = createMockFunctions(mockData);

    addMockFunctionsToSchema({
      mocks,
      preserveResolvers: true,
      schema: executableSchema
    });

    server = new ApolloServer({ schema: executableSchema });

    server.listen().then(({ url }) => {
      console.log(`🚀  ${serviceName} ready at ${url}`);
      resolve(true);
    });
  });
}

export function stop() {
  return new Promise(resolve => {
    if (server) {
      server.stop().then(() => {
        console.log(`${serviceName} closed`);
        resolve(true);
      });
    }
    resolve(true);
  });
}
