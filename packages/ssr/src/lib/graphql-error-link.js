const { onError } = require("apollo-link-error");

const errorLink = logger =>
  onError(({ networkError, graphQLErrors }) => {
    let msg = "";
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message }) => {
        msg = `[GraphQL error]: Message: ${message}`;
        /* eslint no-console: ["error", { allow: ["error"] }], no-unused-expressions: ["error", { "allowTernary": true }]  */
        logger ? logger.error(msg) : console.error(msg);
      });
    }
    if (networkError) {
      msg = `[GraphQL Network error]: ${networkError}`;
      /* eslint no-console: ["error", { allow: ["error"] }], no-unused-expressions: ["error", { "allowTernary": true }] */
      logger ? logger.error(msg) : console.error(msg);
    }
  });

module.exports = errorLink;
