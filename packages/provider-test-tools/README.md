# Provider test tools

The provider-tester implements a custom ApolloLink (TestLink) that keeps track
of important events that occur when using ApolloProvider within react.

It aggregates all major events within the Render - Query - Response cycle of the
ApolloClient and a mocked GraphQL endpoint.

This framework provides hooks to manipulate the order of responses to write
tests that ensure that components render the expected results even regardless of
the order of Responses.

## Types

```js
type Operation = {
  variables: object, // variables used within a query
  queryName: string // name of the query
};

type QueryHandle = {
  operation: Operation,
  promise: () => Promise, // promise that blocks the query
  resolve: () => Promise // this method resolves the promise
};

type RenderEvent = {
  type: "render",
  props: object
};

type RequestEvent = {
  type: "request",
  operation: Operation
};

type ResolvingEvent = {
  type: "resolving",
  operation: Operation
};

type ResolvedEvent = {
  type: "resolved",
  operation: Operation
};

type TestLinkEvent =
  | RequestEvent
  | ResolvingEvent
  | ResolvedEvent
  | RenderEvent;

type GraphQLResponse = any;

type RequestHandler = Operation => Promise<GraphQLResponse>;

type ClientTester = { client: ApolloClient, link: TestLink };

type ProviderTester = {
  client: ApolloClient,
  link: TestLink,
  setProps: props => Promise<void> // changes the props of the component
};
```

# Basic Principle

ApolloClient exposes the public method `client.query(query, options)` that can
be either used by the ApolloProvider or invoked directly.

This internaly calls `ApolloLink#request` which calls the GraphQL endpoint.

TestLink suspends all requests and requires the test writer to unblock those
requests by calling `QueryHandle#resolve()`

# Factories

## clientTester(onRequest: OnRequest): ClientTester

## providerTester(onRequest: OnRequest, component: React.Component, initialProps: {}): ProviderTester

# TestLink

TestLink is a custom ApolloLink that exposes the following methods:

## TestLink#filterByQuery(QueryName: string, variables: ?object): [QueryHandle]

returns all QueryHandles that match QueryName and the set of variables if
provided.

## TestLink#findByQuery(QueryName: string, variables: ?object): QueryHandle

similar to filterByQuery but only returns the first match.

## Helpers

Additionally there are convinience functions that operate on testlink:

### getEvents(link: TestLink): [TestLinkEvent]

returns all events

### getResolvedQueries(link: TestLink): [ResolvedEvent]

returns all the events that have been resolved

### getRenderedQueries(link: TestLink): [any]

returns an array of props in the order that the Provider called it's children
