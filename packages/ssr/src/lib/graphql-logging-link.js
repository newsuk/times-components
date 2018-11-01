const { ApolloLink } = require("apollo-link");

class LogLink extends ApolloLink {
  constructor(uri, logger) {
    super();
    this.uri = uri;
    this.logger = logger;
  }
  request(operation, forward) {
    let msg = `Connecting to GraphQL at ${this.uri} for ${
      operation.operationName
    }`;
    /* eslint no-console: ["error", { allow: ["log"] }], no-unused-expressions: ["error", { "allowTernary": true }] */
    this.logger ? this.logger.debug(msg) : console.log(msg);

    return forward(operation).map(data => {
      msg = `Ending GraphQL request for ${operation.operationName}`;
      /* eslint no-console: ["error", { allow: ["log"] }], no-unused-expressions: ["error", { "allowTernary": true }]  */
      this.logger ? this.logger.debug(msg) : console.log(msg);
      return data;
    });
  }
}

module.exports = LogLink;
