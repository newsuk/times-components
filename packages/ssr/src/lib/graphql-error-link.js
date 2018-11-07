const { onError } = require("apollo-link-error");

const errorLink = logger =>
  onError(({ networkError, graphQLErrors }) => {
    let msg = "";
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message }) => {
        msg = `[GraphQL error]: Message: ${message}`;
        logger.error(msg);
      });
    }
    if (networkError) {
      msg = `[GraphQL Network error]: ${networkError}`;
      logger.error(msg);
    }
  });

module.exports = errorLink;
