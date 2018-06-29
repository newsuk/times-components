import React, { Component } from "react";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { MockLink } from "react-apollo/test-utils";
import { InMemoryCache as Cache } from "apollo-cache-inmemory";
import PropTypes from "prop-types";
import { fragmentMatcher } from "@times-components/utils";

class MockedProvider extends Component {
  constructor(props, context) {
    super(props, context);

    this.client = new ApolloClient({
      link: new MockLink(props.mocks),
      cache: new Cache({ addTypename: !props.removeTypename, fragmentMatcher })
    });
  }

  render() {
    return (
      <ApolloProvider client={this.client}>
        {this.props.children}
      </ApolloProvider>
    );
  }
}

const GraphQLRequest = PropTypes.shape({
  query: PropTypes.object.isRequired,
  variables: PropTypes.object,
  operationName: PropTypes.string,
  context: PropTypes.object,
  extensions: PropTypes.object
});

MockedProvider.propTypes = {
  mocks: PropTypes.arrayOf(
    PropTypes.shape({
      request: GraphQLRequest.isRequired,
      result: PropTypes.object,
      error: PropTypes.object,
      delay: PropTypes.number,
      newData: PropTypes.func
    })
  ).isRequired,
  children: PropTypes.node.isRequired,
  removeTypename: PropTypes.bool
};

MockedProvider.defaultProps = {
  removeTypename: false
};

export default MockedProvider;
