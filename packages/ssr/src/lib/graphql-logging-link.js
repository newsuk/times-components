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
    }
    with parameters ${JSON.stringify(operation.variables)}`;
    this.logger.debug(msg);

    return forward(operation).map(data => {
      msg = `Ending GraphQL request for ${operation.operationName}
        with parameters ${JSON.stringify(operation.variables)}`;
      this.logger.debug(msg);
      return data;
    });
  }
}

module.exports = LogLink;
