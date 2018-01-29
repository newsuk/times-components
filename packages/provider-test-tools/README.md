# Provider tester

The provider-tester implements a custom ApolloLink that keeps track of important
events that occur when using ApolloProvider within react.

It aggregates all major events within the Render - Query - Response cycle
between ApolloClient and a mocked GraphQL endpoint.

This framework provides hooks to manipulate the order of responses to write
tests that ensure that components render the expected results even regardless of
the order of Responses.
