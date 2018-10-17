import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";
import { graphql } from "graphql";
import { print } from "graphql/language/printer";
import { printSchema, buildClientSchema } from "graphql/utilities";

export default ({ data: { __schema } }) => ({
  types: defaultTypes,
  values: defaultValues
} = {}) => (query, { types = {}, values = {}, variables } = {}) => {
  const schemaSDL = printSchema(buildClientSchema({ __schema }));

  const schema = makeExecutableSchema({
    resolvers: {
      Query: {
        ...defaultValues,
        ...values
      }
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    typeDefs: schemaSDL
  });

  addMockFunctionsToSchema({
    mocks: {
      ...defaultTypes,
      ...types
    },
    preserveResolvers: true,
    schema
  });

  return graphql(schema, print(query), null, null, variables);
};
