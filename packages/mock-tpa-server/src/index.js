/* eslint-disable no-console */

import { ApolloServer } from "apollo-server";
import { MockArticle }  from "../../fixture-generator/dist/index";
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


   const article = new MockArticle().withSundayTimes().withImageLeadAsset().withRelatedArticles().fetch();
   console.log(article.relatedArticleSlice.items)

    addMockFunctionsToSchema({
      mocks: {
        Article: () => article,
        Media: () => ({__typename: "Image"}),
        Slug: () => "some-slug",
        ArticleSlice: () => ({
          __typename: "StandardSlice",
        }),
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

