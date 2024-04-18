const { onError } = require("apollo-link-error");

const errorLink = logger =>
  onError(({ operation, networkError, graphQLErrors }) => {
    let msg = "";
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message }) => {
        msg = `[GraphQL error]: Message: ${message}, Query: ${
          operation.query
        }, Variables: ${JSON.stringify(operation.variables)}`;
        logger.error(msg);
      });
    }
    if (networkError) {
      msg = `[GraphQL Network error]: ${networkError}, Query: ${
        operation.query
      }, Variables: ${JSON.stringify(operation.variables)}`;
      logger.error(msg);
    }
  });

module.exports = errorLink;
