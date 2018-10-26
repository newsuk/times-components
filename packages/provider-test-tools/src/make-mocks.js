import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";
import { printSchema, buildClientSchema } from "graphql/utilities";

export default ({ data: { __schema } }) => ({
  types: defaultTypes,
  values: defaultValues
} = {}) => {
  const schemaSDL = printSchema(buildClientSchema({ __schema }));

  const schema = makeExecutableSchema({
    resolvers: {
      Query: {
        ...defaultValues
      }
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    typeDefs: schemaSDL
  });

  addMockFunctionsToSchema({
    mocks: {
      ...defaultTypes
    },
    preserveResolvers: true,
    schema
  });

  return schema;
};
