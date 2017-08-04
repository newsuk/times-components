import React from "react";

const actualReactApollo = require.requireActual("react-apollo");

let mockProps = {};
const setMockGraphQLProps = props => {
  mockProps = props;
};
const graphql = () => Component => props =>
  <Component {...mockProps} {...props} />;

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
  setMockGraphQLProps
};
