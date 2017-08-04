import React from "react";

const actualReactApollo = require.requireActual("react-apollo");

let mockProps = {};
let mockGraphqlExpectations = () => {};

const setMockGraphQLProps = (props, expectations = () => {}) => {
  mockGraphqlExpectations = expectations;
  mockProps = props;
};

const resetMockGraphQLProps = () => {
  setMockGraphQLProps({});
};

const graphql = (query, variables) => Component => props => {
  mockGraphqlExpectations(query, variables);
  return <Component {...mockProps} {...props} />;
};

const {
  ApolloClient,
  compose,
  createBatchingNetworkInterface,
  gql
} = actualReactApollo;

export {
  ApolloClient,
  compose,
  createBatchingNetworkInterface,
  gql,
  graphql,
  resetMockGraphQLProps,
  setMockGraphQLProps
};