/* eslint-disable no-console */

import { ApolloServer } from "apollo-server";
import { MockArticle }  from "../../fixture-generator/dist/index";
import wholeschema from "../../schema/schema.json" 
import { printSchema, buildClientSchema } from "graphql/utilities";
import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";

import { makeMocks } from "@times-components/provider-test-tools";
import mockData from "./fixtures/mock-data";

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

  //const schema = makeMocks(mockData());

   const article = new MockArticle().withSundayTimes().withImageLeadAsset().withRelatedArticles(5).create();

    addMockFunctionsToSchema({
      mocks: {
        Article: () => article,
        Media: () => ({__typename: "Image"}),
       
        ArticleSlice: () => ({
          __typename: "StandardSlice",
        }),
        Slug: () => "some-slug",
        Markup: () => ({}),
        // Ratio: () => "16:9",
        // Tile: () => ({}),
        // URL: () => "https://test.io",
        // UUID: () => "a-u-u-i-d",
        // DateTime: () => "2018-10-25",
        // StandardSlice: () => ({
        //   __typename: "StandardSlice",
        //   items: []
        // }),
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

