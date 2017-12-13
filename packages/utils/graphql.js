/* eslint-disable no-underscore-dangle */

import React, { Component } from "react";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { MockLink } from "react-apollo/test-links";
import {
  InMemoryCache as Cache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory"; // eslint-disable-line import/no-unresolved
import PropTypes from "prop-types";
import introspectionResult from "./schema.json";

const filteredTypes = introspectionResult.data.__schema.types.filter(
  ({ possibleTypes }) => possibleTypes !== null
);
const introspectionQueryResultData = {
  __schema: {
    ...introspectionResult.data.__schema,
    types: filteredTypes
  }
};

export const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

export const createMockClient = (mocks, removeTypename) =>
  new ApolloClient({
    link: new MockLink(mocks),
    cache: new Cache({ addTypename: !removeTypename, fragmentMatcher })
  });

class MockedProvider extends Component {
  constructor(props, context) {
    super(props, context);

    this.client = createMockClient(props.mocks, props.removeTypename);
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

export { MockedProvider };
