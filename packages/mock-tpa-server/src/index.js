/* eslint-disable no-console */

import { ApolloServer } from "apollo-server";
import { article, makeMocks } from "@times-components/provider-test-tools";
import { MockArticle, MockImage}  from "../../fixture-generator/dist/index";
import wholeschema from "../../schema/schema.json" 
import { printSchema, buildClientSchema } from "graphql/utilities";
import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";


const serviceName = "Mock TPA server";

let server;

export function start() {
  return new Promise(resolve => {
    const __schema = wholeschema.data.__schema
    const schemaSDL = printSchema(buildClientSchema({__schema}));

    const schema = makeExecutableSchema({
      resolverValidationOptions: {
        requireResolversForResolveType: false
      },
      typeDefs: schemaSDL
    });


   const article = new MockArticle().withSundayTimes().withImage().fetch();
   console.log(article)
   const image = new MockImage().fetch();
    addMockFunctionsToSchema({
      mocks: {
        Article: () => article,
        Media: () => ({__typename: "Image", image})
      },
      preserveResolvers: true,
      schema
    });

      server = new ApolloServer({ schema });

      server.listen().then(({ url }) => {
        console.log(`🚀  ${serviceName} ready at ${url}`);
        resolve(true)
      });
   })
}

export function stop() {
  if (server) {
    server.stop();
    console.log(`${serviceName} closed`);
  }
}

