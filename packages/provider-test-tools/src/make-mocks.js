import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";
import { graphql } from "graphql";
import { printSchema, buildClientSchema } from "graphql/utilities";

export default ({ data: { __schema } }) => (
  { types: defaultTypes, values: defaultValues } = {}
) => (query, { types = {}, values = {}, variables } = {}) => {
  const schemaSDL = printSchema(buildClientSchema({ __schema }));

  const schema = makeExecutableSchema({
    typeDefs: schemaSDL,
    resolvers: {
      Query: {
        ...defaultValues,
        ...values
      }
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    }
  });

  addMockFunctionsToSchema({
    schema,
    mocks: {
      ...defaultTypes,
      ...types
    },
    preserveResolvers: true
  });

  return graphql(schema, query, null, null, variables);
};
