/* eslint-disable no-console */

import { ApolloServer } from "apollo-server";
import { printSchema, buildClientSchema } from "graphql/utilities";
import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";

import { makeMocks } from "@times-components/provider-test-tools";
import wholeschema from "../../schema/schema.json" 
import { MockArticle }  from "../../fixture-generator/dist/index";
import mockData from "./fixtures/mock-data";

const serviceName = "Mock TPA server";

let server;

export function startWithMockData(mockData) {
  return new Promise(resolve => {
    const __schema = wholeschema.data.__schema
    const schemaSDL = printSchema(buildClientSchema({__schema}));

    const schema = makeExecutableSchema({
      resolverValidationOptions: {
        requireResolversForResolveType: false
      },
      typeDefs: schemaSDL
    });

    

    //const mockFunctions = createMockFunctions(mockData)

    addMockFunctionsToSchema({
      mocks: {
        Article: () => ({__typename: "Article", ...mockData.Article}),
        Media: () => ({__typename: "Image"}),
       
        ArticleSlice: () => ({
          __typename: "StandardSlice",
        }),
        Slug: () => ({__typename: 'Slug'}), //"some-slug",
        Markup: () => ({}),
       
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

