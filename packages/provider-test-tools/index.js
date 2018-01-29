import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, Observable } from "apollo-link";
import renderer from "react-test-renderer";
import { ApolloProvider } from "react-apollo";
import React from "react";
import PropTypes from "prop-types";
import isEqual from "lodash.isequal";

function createFuture() {
  let resolve;
  const promise = new Promise(done => {
    resolve = done;
  });

  return {
    resolve: () => {
      setTimeout(resolve);
      return promise;
    },
    promise: () => promise
  };
}

export class TestLink extends ApolloLink {
  constructor(onRequest) {
    super();
    this.onRequest = onRequest;
    this.operations = [];
    this.blocked = [];
    this.events = [];
  }

  findByQuery(queryName, variables) {
    return this.operations.find(
      ({ operation }) =>
        operation.operationName === queryName &&
        (!variables || isEqual(operation.variables, variables))
    );
  }

  filterByQuery(queryName, variables) {
    return this.operations.filter(
      ({ operation }) =>
        operation.operationName === queryName &&
        (!variables || isEqual(operation.variables, variables))
    );
  }

  // push a custom event
  pushEvent(data) {
    this.events.push(data);
  }

  // get all requests
  getRequests() {
    return this.operations;
  }

  // find and resolve a request by a given filter

  // get all events
  getEvents() {
    return this.events;
  }

  // used by apollo provider
  request(operation) {
    this.blocked.push(createFuture());
    const { promise, resolve } = this.blocked[this.blocked.length - 1];
    this.operations.push({ operation, resolve, promise });
    this.events.push({ type: "request", operation });
    return new Observable(observer => {
      Promise.resolve(this.onRequest(operation))
        .then(async data => {
          this.events.push({ type: "resolving", operation });
          await promise();
          this.events.push({ type: "resolved", operation, data });
          if (!observer.closed) {
            observer.next(data);
            observer.complete();
          }
        })
        .catch(e => {
          this.events.push({ type: "error", error: e });
          if (!observer.closed) {
            observer.error(e);
          }
        });
    });
  }
}

export function clientTester(requestHandler) {
  const link = new TestLink(requestHandler);
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link
  });

  return { client, link };
}

export function providerTester(requestHandler, Component, defaultProps = {}) {
  const { link, client } = clientTester(requestHandler);

  let setProps = () => Promise.resolve();
  class Stateful extends React.Component {
    constructor(props) {
      super(props);
      this.state = defaultProps;
    }

    componentDidMount() {
      setProps = state =>
        new Promise(done =>
          this.setState(() => {
            done(state);
            return state;
          })
        );
    }

    componentWillUnmount() {
      setProps = () => Promise.resolve();
    }

    render() {
      const Child = this.props.children;
      return <Child {...this.state} />;
    }
  }

  Stateful.propTypes = {
    children: PropTypes.func.isRequired
  };

  const component = renderer.create(
    <ApolloProvider client={client}>
      {
        <Stateful>
          {state => (
            <Component {...state}>
              {props => {
                link.pushEvent({ type: "render", props });
                return null;
              }}
            </Component>
          )}
        </Stateful>
      }
    </ApolloProvider>
  );

  return {
    client,
    link,
    setProps,
    component
  };
}

function tidyEvent(e) {
  if (e.type === "render") {
    return e;
  }

  return {
    type: e.type,
    query: e.operation.operationName,
    vars: e.operation.variables
  };
}

export function getEvents(link) {
  return link.getEvents().map(tidyEvent);
}

export function getResolvedQueries(link) {
  return link
    .getEvents()
    .filter(e => e.type === "resolved")
    .map(tidyEvent);
}

export function getRenderedQueries(link) {
  return link
    .getEvents()
    .filter(e => e.type === "render")
    .map(tidyEvent)
    .map(x => x.props);
}
