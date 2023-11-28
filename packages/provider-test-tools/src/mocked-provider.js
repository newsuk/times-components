import React, { Component } from "react";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { ApolloProvider } from "react-apollo";
import { MockLink } from "react-apollo/test-utils";
import { InMemoryCache as Cache } from "apollo-cache-inmemory";
import PropTypes from "prop-types";
import Observable from "zen-observable";
import { fragmentMatcher } from "@times-components/schema";

class MockedProvider extends Component {
  constructor(props, context) {
    super(props, context);

    const link = props.isLoading
      ? new ApolloLink(() => Observable.of())
      : new MockLink(props.mocks);

    this.client = new ApolloClient({
      cache: new Cache({
        addTypename: !props.removeTypename,
        fragmentMatcher
      }),
      link
    });
  }

  render() {
    const { children } = this.props;

    return <ApolloProvider client={this.client}>{children}</ApolloProvider>;
  }
}

const GraphQLRequest = PropTypes.shape({
  context: PropTypes.object,
  extensions: PropTypes.object,
  operationName: PropTypes.string,
  query: PropTypes.object.isRequired,
  variables: PropTypes.object
});

MockedProvider.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  mocks: PropTypes.arrayOf(
    PropTypes.shape({
      delay: PropTypes.number,
      error: PropTypes.object,
      newData: PropTypes.func,
      request: GraphQLRequest.isRequired,
      result: PropTypes.object
    })
  ).isRequired,
  removeTypename: PropTypes.bool
};

MockedProvider.defaultProps = {
  isLoading: false,
  removeTypename: false
};

export default MockedProvider;
