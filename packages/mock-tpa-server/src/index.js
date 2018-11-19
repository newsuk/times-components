/* eslint-disable no-console */

import { ApolloServer } from "apollo-server";
import { article, makeMocks } from "@times-components/provider-test-tools";
import MockArticle  from "../../fixture-generator/dist/index";
import wholeschema from "../../schema/schema.json" 
import { printSchema, buildClientSchema } from "graphql/utilities";
import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";


const serviceName = "Mock TPA server";

let server;

export function start() {
  return new Promise(resolve => {
    // const [{ defaults }] = article();
    console.log("HELLO")
    const __schema = wholeschema.data.__schema
    const schemaSDL = printSchema(buildClientSchema({__schema}));


    const schema = makeExecutableSchema({
      resolverValidationOptions: {
        requireResolversForResolveType: false
      },
      typeDefs: schemaSDL
    });

    console.log(schema)

   const article = new MockArticle().withSundayTimes().fetch();
    addMockFunctionsToSchema({
      mocks: {
        Article: () => article
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



// export default ({ data: { __schema } }) => ({
//   types: defaultTypes,
//   values: defaultValues
// } = {}) => {
 
    // resolvers: {
    //   Query: {
    //     ...defaultValues
    //   }
    // },
    

//   return schema;
// };